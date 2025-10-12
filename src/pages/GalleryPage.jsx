import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { galleryAPI } from '../utils/api';

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await galleryAPI.getAll(1, 50); // Get more images for gallery
        setGallery(response.data.gallery);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Set dummy data for demonstration
        setGallery([
          {
            id: 1,
            title: "Fire Safety Training Session",
            description: "Participants learning fire extinguisher usage",
            image: "https://images.pexels.com/photos/1661816/pexels-photo-1661816.jpeg",
            category: "Fire Safety"
          },
          {
            id: 2,
            title: "Maritime Safety Training",
            description: "Ship safety procedures demonstration",
            image: "https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg",
            category: "Maritime K3"
          },
          {
            id: 3,
            title: "General K3 Classroom Session",
            description: "Interactive safety awareness training",
            image: "https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg",
            category: "General K3"
          },
          {
            id: 4,
            title: "Emergency Response Drill",
            description: "Emergency evacuation procedures",
            image: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg",
            category: "Emergency"
          },
          {
            id: 5,
            title: "Safety Equipment Training",
            description: "Proper use of safety equipment",
            image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg",
            category: "Equipment"
          },
          {
            id: 6,
            title: "Team Building Activities",
            description: "Safety-focused team building exercises",
            image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
            category: "Team Building"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredGallery = gallery.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-600 to-secondary-800 text-white pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Training Gallery
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-100">
              Explore our training activities, facilities, and successful programs
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64"></div>
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
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={item.image ? (item.image.startsWith('http') ? item.image : `https://api-inventory.isavralabel.com/imtc/uploads/${item.image}`) : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Images Found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search criteria</p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
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
              src={selectedImage.image ? (selectedImage.image.startsWith('http') ? selectedImage.image : `https://api-inventory.isavralabel.com/imtc/uploads/${selectedImage.image}`) : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
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

      <Footer />
    </div>
  );
};

export default GalleryPage;