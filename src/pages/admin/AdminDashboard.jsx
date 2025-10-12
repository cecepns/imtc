import { useState, useEffect } from "react";
import {
  BookOpen,
  Image,
  Users,
  TrendingUp,
  Settings,
  Calendar,
  Eye,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    trainings: 0,
    gallery: 0,
    recentTrainings: [],
    recentGallery: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/api/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Set dummy data for demonstration
        setStats({
          trainings: 12,
          gallery: 45,
          recentTrainings: [
            { id: 1, title: "General K3 Training", created_at: "2024-01-15" },
            {
              id: 2,
              title: "Maritime Safety Training",
              created_at: "2024-01-14",
            },
            { id: 3, title: "Fire Safety Training", created_at: "2024-01-13" },
          ],
          recentGallery: [
            { id: 1, title: "Training Session 1", created_at: "2024-01-15" },
            { id: 2, title: "Safety Equipment Demo", created_at: "2024-01-14" },
            {
              id: 3,
              title: "Certification Ceremony",
              created_at: "2024-01-13",
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to IMTC Global Training Admin Panel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Trainings
                </p>
                <p className="text-3xl font-bold text-secondary-600">
                  {loading ? "..." : stats.trainings}
                </p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-secondary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Gallery Items
                </p>
                <p className="text-3xl font-bold text-primary-600">
                  {loading ? "..." : stats.gallery}
                </p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <Image className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-accent-600">2,543</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth</p>
                <p className="text-3xl font-bold text-green-600">+12%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Trainings */}
          <div className="bg-white rounded-xl shadow-lg border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Trainings
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : stats.recentTrainings.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentTrainings.map((training) => (
                    <div
                      key={training.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {training.title}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(training.created_at)}
                        </p>
                      </div>
                      <BookOpen className="h-5 w-5 text-secondary-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent trainings
                </p>
              )}
            </div>
          </div>

          {/* Recent Gallery */}
          <div className="bg-white rounded-xl shadow-lg border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Gallery
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : stats.recentGallery.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentGallery.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <Image className="h-5 w-5 text-primary-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent gallery items
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/trainings"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-colors"
            >
              <BookOpen className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Manage Trainings</h3>
              <p className="text-sm opacity-90">
                Add, edit, or remove training programs
              </p>
            </a>
            <a
              href="/admin/gallery"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-colors"
            >
              <Image className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Manage Gallery</h3>
              <p className="text-sm opacity-90">
                Upload and organize gallery images
              </p>
            </a>
            <a
              href="/admin/settings"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg transition-colors"
            >
              <Settings className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Website Settings</h3>
              <p className="text-sm opacity-90">
                Configure site information and content
              </p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
