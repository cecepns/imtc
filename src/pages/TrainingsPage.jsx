import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ListFilter as Filter,
  Clock,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { trainingAPI } from "../utils/api";

const TrainingsPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const categories = [
    "General K3",
    "Maritime K3",
    "Fire Safety",
    "Scaffold",
    "Consulting",
  ];

  const fetchTrainings = async (page = 1) => {
    try {
      setLoading(true);
      const response = await trainingAPI.getAll(page, 10);
      setTrainings(response.data.trainings);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching trainings:", error);
      // Set dummy data for demonstration
      setTrainings([
        {
          id: 1,
          title: "General K3 Training",
          short_description: "Comprehensive safety training for all industries",
          category: "General K3",
          duration: "3 Days",
          max_participants: 20,
          image:
            "https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg",
        },
        {
          id: 2,
          title: "Maritime Safety Training",
          short_description:
            "Specialized maritime safety and emergency procedures",
          category: "Maritime K3",
          duration: "5 Days",
          max_participants: 15,
          image:
            "https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg",
        },
        {
          id: 3,
          title: "Fire Safety & Emergency Response",
          short_description:
            "Fire prevention, suppression and emergency evacuation",
          category: "Fire Safety",
          duration: "2 Days",
          max_participants: 25,
          image:
            "https://images.pexels.com/photos/1661816/pexels-photo-1661816.jpeg",
        },
      ]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings(currentPage);
  }, [currentPage]);

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.short_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || training.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-600 to-secondary-800 text-white pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Training Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-100">
              Professional safety training programs designed to meet
              international standards
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search training programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Training Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTrainings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrainings.map((training) => (
                  <div
                    key={training.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="w-full h-96">
                      <img
                        src={
                          training.image
                            ? `https://api-inventory.isavralabel.com/imtc/uploads/${training.image}`
                            : "https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg"
                        }
                        alt={training.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary-600 font-semibold bg-primary-50 px-3 py-1 rounded-full">
                          {training.category}
                        </span>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{training.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {training.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {training.short_description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            Max {training.max_participants} participants
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/training/${training.id}`}
                        className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                      >
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          currentPage === page
                            ? "bg-secondary-600 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Training Programs Found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search criteria or browse all programs
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Programs
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainingsPage;
