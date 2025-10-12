import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminLayout from '../../components/admin/AdminLayout';
import { trainingAPI } from '../../utils/api';
import { formatRupiah } from '../../utils/formatters';

const AdminTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    description: '',
    category: '',
    duration: '',
    max_participants: '',
    price: '',
    location: '',
    schedule: '',
    requirements: '',
    certification: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ['General K3', 'Maritime K3', 'Fire Safety', 'Scaffold', 'Consulting'];

  const fetchTrainings = async (page = 1) => {
    try {
      setLoading(true);
      const response = await trainingAPI.getAll(page, 10);
      setTrainings(response.data.trainings);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error('Error fetching trainings:', error);
      // Set dummy data for demonstration
      setTrainings([
        {
          id: 1,
          title: "General K3 Training",
          short_description: "Comprehensive safety training for all industries",
          category: "General K3",
          duration: "3 Days",
          max_participants: 20,
          price: 2500000,
          image: "training1.jpg"
        },
        {
          id: 2,
          title: "Maritime Safety Training",
          short_description: "Specialized maritime safety and emergency procedures",
          category: "Maritime K3",
          duration: "5 Days",
          max_participants: 15,
          price: 3500000,
          image: "training2.jpg"
        }
      ]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings(currentPage);
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

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }));
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

      if (editingTraining) {
        await trainingAPI.update(editingTraining.id, submitData);
      } else {
        await trainingAPI.create(submitData);
      }

      setShowModal(false);
      setEditingTraining(null);
      resetForm();
      fetchTrainings(currentPage);
    } catch (error) {
      console.error('Error saving training:', error);
      alert('Error saving training. Please try again.');
    }
  };

  const handleEdit = (training) => {
    setEditingTraining(training);
    setFormData({
      title: training.title || '',
      short_description: training.short_description || '',
      description: training.description || '',
      category: training.category || '',
      duration: training.duration || '',
      max_participants: training.max_participants || '',
      price: training.price || '',
      location: training.location || '',
      schedule: training.schedule || '',
      requirements: training.requirements || '',
      certification: training.certification || '',
      image: null
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      try {
        await trainingAPI.delete(id);
        fetchTrainings(currentPage);
      } catch (error) {
        console.error('Error deleting training:', error);
        alert('Error deleting training. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      short_description: '',
      description: '',
      category: '',
      duration: '',
      max_participants: '',
      price: '',
      location: '',
      schedule: '',
      requirements: '',
      certification: '',
      image: null
    });
    setImagePreview(null);
  };

  const filteredTrainings = trainings.filter(training =>
    training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Management</h1>
            <p className="text-gray-600">Manage training programs and courses</p>
          </div>
          <button
            onClick={() => {
              setEditingTraining(null);
              resetForm();
              setShowModal(true);
            }}
            className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Training
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-lg border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search trainings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Training List */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : filteredTrainings.length > 0 ? (
                  filteredTrainings.map((training) => (
                    <tr key={training.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={training.image ? `https://api-inventory.isavralabel.com/imtc/uploads/${training.image}` : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
                              alt={training.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {training.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {training.short_description?.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {training.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {training.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatRupiah(training.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`/training/${training.id}`, '_blank')}
                            className="text-accent-600 hover:text-accent-900 p-1 rounded"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(training)}
                            className="text-secondary-600 hover:text-secondary-900 p-1 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(training.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No trainings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
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
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTraining ? 'Edit Training' : 'Add New Training'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 Days"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    name="max_participants"
                    value={formData.max_participants}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (IDR)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  modules={quillModules}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Every Monday & Wednesday"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certification
                </label>
                <textarea
                  name="certification"
                  value={formData.certification}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary-50 file:text-secondary-700 hover:file:bg-secondary-100"
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
                  
                  {editingTraining && editingTraining.image && !imagePreview && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                      <img
                        src={`https://api-inventory.isavralabel.com/imtc/uploads/${editingTraining.image}`}
                        alt="Current"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {editingTraining.image}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTraining(null);
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
                  {editingTraining ? 'Update Training' : 'Create Training'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTrainings;