import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { galleryAPI } from '../../utils/api';

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ['Fire Safety', 'Maritime K3', 'General K3', 'Emergency', 'Equipment', 'Team Building', 'Certification', 'Practical'];

  const fetchGallery = async (page = 1) => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll(page, 10);
      setGallery(response.data.gallery);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // Set dummy data for demonstration
      setGallery([
        {
          id: 1,
          title: "Fire Safety Training Session",
          description: "Participants learning fire extinguisher usage",
          category: "Fire Safety",
          image: "gallery1.jpg"
        },
        {
          id: 2,
          title: "Maritime Safety Training",
          description: "Ship safety procedures demonstration",
          category: "Maritime K3",
          image: "gallery2.jpg"
        },
        {
          id: 3,
          title: "General K3 Classroom Session",
          description: "Interactive safety awareness training",
          category: "General K3",
          image: "gallery3.jpg"
        }
      ]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      if (editingItem) {
        await galleryAPI.update(editingItem.id, submitData);
      } else {
        await galleryAPI.create(submitData);
      }

      setShowModal(false);
      setEditingItem(null);
      resetForm();
      fetchGallery(currentPage);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Error saving gallery item. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || '',
      image: null
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await galleryAPI.delete(id);
        fetchGallery(currentPage);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Error deleting gallery item. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image: null
    });
    setImagePreview(null);
  };

  const filteredGallery = gallery.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600">Manage training photos and gallery images</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              resetForm();
              setShowModal(true);
            }}
            className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Image
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-lg border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white rounded-xl shadow-lg border p-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-48"></div>
                  <div className="mt-3">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <img
                      src={item.image ? `https://api-inventory.isavralabel.com/imtc/uploads/${item.image}` : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
                      alt={item.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => setSelectedImage(item)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-white text-secondary-600 p-2 rounded-full hover:bg-secondary-50"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No gallery items found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-secondary-50 border-secondary-500 text-secondary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image *
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary-50 file:text-secondary-700 hover:file:bg-secondary-100"
                    required={!editingItem}
                  />
                  
                  {/* Image Preview */}
                  <div className="mt-4 space-y-3">
                    {imagePreview && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">New Image Preview:</p>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-secondary-200"
                        />
                      </div>
                    )}
                    
                    {editingItem && editingItem.image && !imagePreview && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                        <img
                          src={`https://api-inventory.isavralabel.com/imtc/uploads/${editingItem.image}`}
                          alt="Current"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {editingItem.image}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 p-6 pt-4 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-xl">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-semibold"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.image ? `https://api-inventory.isavralabel.com/imtc/uploads/${selectedImage.image}` : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-200">{selectedImage.description}</p>
              <p className="text-sm text-gray-400 mt-1">Category: {selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;