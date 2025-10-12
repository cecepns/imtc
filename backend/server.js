const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads-imtc'));

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'imtc_training'
};

let connection;

async function initDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

initDatabase();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads-imtc');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// JWT Secret
const JWT_SECRET = 'imtc_training_secret_key_2024';

// Helper function to check if an image is used by other records
async function isImageUsed(filename, excludeTable = null, excludeId = null) {
  if (!filename) return false;
  
  let usageCount = 0;
  
  // Check in trainings table
  if (excludeTable !== 'trainings' || excludeId) {
    const query = excludeTable === 'trainings' && excludeId
      ? 'SELECT COUNT(*) as count FROM trainings WHERE image = ? AND id != ? AND active = 1'
      : 'SELECT COUNT(*) as count FROM trainings WHERE image = ? AND active = 1';
    const params = excludeTable === 'trainings' && excludeId ? [filename, excludeId] : [filename];
    
    const [trainingRows] = await connection.execute(query, params);
    usageCount += trainingRows[0].count;
  }
  
  // Check in gallery table
  if (excludeTable !== 'gallery' || excludeId) {
    const query = excludeTable === 'gallery' && excludeId
      ? 'SELECT COUNT(*) as count FROM gallery WHERE image = ? AND id != ? AND active = 1'
      : 'SELECT COUNT(*) as count FROM gallery WHERE image = ? AND active = 1';
    const params = excludeTable === 'gallery' && excludeId ? [filename, excludeId] : [filename];
    
    const [galleryRows] = await connection.execute(query, params);
    usageCount += galleryRows[0].count;
  }
  
  return usageCount > 0;
}

// Helper function to safely delete an image file
async function deleteImageFile(filename) {
  if (!filename) return;
  
  const imagePath = path.join(__dirname, 'uploads-imtc', filename);
  
  try {
    if (fs.existsSync(imagePath)) {
      // Check if image is still being used
      const isUsed = await isImageUsed(filename);
      
      if (!isUsed) {
        fs.unlinkSync(imagePath);
        console.log(`Deleted unused image: ${filename}`);
        return true;
      } else {
        console.log(`Image ${filename} is still in use, keeping it.`);
        return false;
      }
    }
  } catch (error) {
    console.error(`Error deleting image ${filename}:`, error);
    return false;
  }
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const [rows] = await connection.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Training Routes
app.get('/api/trainings', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM trainings WHERE active = 1'
    );
    const total = countResult[0].total;

    const [rows] = await connection.execute(
      'SELECT * FROM trainings WHERE active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    res.json({
      trainings: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching trainings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/trainings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await connection.execute(
      'SELECT * FROM trainings WHERE id = ? AND active = 1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Training not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching training:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/trainings', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      short_description,
      description,
      category,
      duration,
      max_participants,
      price,
      location,
      schedule,
      requirements,
      certification
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const [result] = await connection.execute(
      `INSERT INTO trainings 
       (title, short_description, description, category, duration, max_participants, 
        price, location, schedule, requirements, certification, image, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [title, short_description, description, category, duration, max_participants,
       price, location, schedule, requirements, certification, image]
    );

    res.json({
      id: result.insertId,
      message: 'Training created successfully'
    });
  } catch (error) {
    console.error('Error creating training:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/trainings/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      short_description,
      description,
      category,
      duration,
      max_participants,
      price,
      location,
      schedule,
      requirements,
      certification
    } = req.body;

    // Get old image filename before updating
    let oldImage = null;
    if (req.file) {
      const [rows] = await connection.execute(
        'SELECT image FROM trainings WHERE id = ?',
        [id]
      );
      if (rows.length > 0) {
        oldImage = rows[0].image;
      }
    }

    let updateFields = [
      'title = ?', 'short_description = ?', 'description = ?', 'category = ?',
      'duration = ?', 'max_participants = ?', 'price = ?', 'location = ?',
      'schedule = ?', 'requirements = ?', 'certification = ?', 'updated_at = NOW()'
    ];
    let values = [
      title, short_description, description, category, duration, max_participants,
      price, location, schedule, requirements, certification
    ];

    if (req.file) {
      updateFields.push('image = ?');
      values.push(req.file.filename);
    }

    values.push(id);

    await connection.execute(
      `UPDATE trainings SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    // Delete old image if it was replaced and not used elsewhere
    if (oldImage && req.file && oldImage !== req.file.filename) {
      await deleteImageFile(oldImage);
    }

    res.json({ message: 'Training updated successfully' });
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/trainings/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get image filename before soft deleting
    const [rows] = await connection.execute(
      'SELECT image FROM trainings WHERE id = ?',
      [id]
    );
    const oldImage = rows.length > 0 ? rows[0].image : null;

    // Soft delete the training
    await connection.execute(
      'UPDATE trainings SET active = 0 WHERE id = ?',
      [id]
    );

    // Delete image if it's not used elsewhere
    if (oldImage) {
      await deleteImageFile(oldImage);
    }

    res.json({ message: 'Training deleted successfully' });
  } catch (error) {
    console.error('Error deleting training:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Gallery Routes
app.get('/api/gallery', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM gallery WHERE active = 1'
    );
    const total = countResult[0].total;

    const [rows] = await connection.execute(
      'SELECT * FROM gallery WHERE active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    res.json({
      gallery: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/gallery', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const [result] = await connection.execute(
      'INSERT INTO gallery (title, description, category, image, created_at) VALUES (?, ?, ?, ?, NOW())',
      [title, description, category, image]
    );

    res.json({
      id: result.insertId,
      message: 'Gallery item created successfully'
    });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/gallery/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    // Get old image filename before updating
    let oldImage = null;
    if (req.file) {
      const [rows] = await connection.execute(
        'SELECT image FROM gallery WHERE id = ?',
        [id]
      );
      if (rows.length > 0) {
        oldImage = rows[0].image;
      }
    }

    let updateFields = ['title = ?', 'description = ?', 'category = ?', 'updated_at = NOW()'];
    let values = [title, description, category];

    if (req.file) {
      updateFields.push('image = ?');
      values.push(req.file.filename);
    }

    values.push(id);

    await connection.execute(
      `UPDATE gallery SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    // Delete old image if it was replaced and not used elsewhere
    if (oldImage && req.file && oldImage !== req.file.filename) {
      await deleteImageFile(oldImage);
    }

    res.json({ message: 'Gallery item updated successfully' });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/gallery/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get image filename before soft deleting
    const [rows] = await connection.execute(
      'SELECT image FROM gallery WHERE id = ?',
      [id]
    );
    const oldImage = rows.length > 0 ? rows[0].image : null;

    // Soft delete the gallery item
    await connection.execute(
      'UPDATE gallery SET active = 0 WHERE id = ?',
      [id]
    );

    // Delete image if it's not used elsewhere
    if (oldImage) {
      await deleteImageFile(oldImage);
    }

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Settings Routes
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM settings ORDER BY id ASC');
    
    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });

    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    const settings = req.body;

    for (const [key, value] of Object.entries(settings)) {
      await connection.execute(
        'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, value, value]
      );
    }

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload Route
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Dashboard Stats Route
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [trainingCount] = await connection.execute(
      'SELECT COUNT(*) as count FROM trainings WHERE active = 1'
    );

    const [galleryCount] = await connection.execute(
      'SELECT COUNT(*) as count FROM gallery WHERE active = 1'
    );

    const [recentTrainings] = await connection.execute(
      'SELECT id, title, created_at FROM trainings WHERE active = 1 ORDER BY created_at DESC LIMIT 5'
    );

    const [recentGallery] = await connection.execute(
      'SELECT id, title, created_at FROM gallery WHERE active = 1 ORDER BY created_at DESC LIMIT 5'
    );

    res.json({
      trainings: trainingCount[0].count,
      gallery: galleryCount[0].count,
      recentTrainings,
      recentGallery
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});