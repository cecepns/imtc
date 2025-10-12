import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, MapPin, Calendar, CircleCheck as CheckCircle, MessageCircle } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { trainingAPI, settingsAPI } from '../utils/api';
import { formatRupiah } from '../utils/formatters';

const TrainingDetailPage = () => {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainingResponse, settingsResponse] = await Promise.all([
          trainingAPI.getById(id),
          settingsAPI.get()
        ]);
        setTraining(trainingResponse.data);
        setSettings(settingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set dummy data for demonstration
        setTraining({
          id: 1,
          title: "General K3 Training Certification",
          short_description: "Comprehensive safety training for all industries",
          description: "<h3>Training Overview</h3><p>This comprehensive General K3 (Occupational Health and Safety) training program is designed to provide participants with essential knowledge and skills to identify, assess, and control workplace hazards across various industries.</p><h3>Learning Objectives</h3><ul><li>Understand fundamental K3 principles and regulations</li><li>Learn hazard identification techniques</li><li>Master risk assessment methodologies</li><li>Implement effective safety control measures</li><li>Develop emergency response procedures</li></ul><h3>Training Methods</h3><p>Our training combines theoretical learning with practical exercises, case studies, and interactive discussions to ensure effective knowledge transfer.</p>",
          category: "General K3",
          duration: "3 Days",
          max_participants: 20,
          price: 2500000,
          location: "Jakarta Training Center",
          schedule: "Every Monday & Wednesday",
          requirements: "Basic education, willingness to learn safety practices",
          certification: "Official K3 Certificate recognized by Ministry of Manpower",
          image: "https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg"
        });
        setSettings({
          whatsapp_number: '6281234567890',
          company_phone: '+62 21 1234 5678',
          company_email: 'info@imtcglobal.com'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-96 bg-gray-200 rounded-xl"></div>
                <div className="space-y-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!training) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Training Not Found</h1>
              <p className="text-gray-600 mb-8">The training program you&apos;re looking for doesn&apos;t exist.</p>
              <Link
                to="/trainings"
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trainings
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-14">
      <Navbar />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/trainings"
              className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-semibold"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trainings
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Image */}
            <div data-aos="fade-right">
              <img
                src={training.image ? `https://api-inventory.isavralabel.com/imtc/uploads/${training.image}` : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
                alt={training.title}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Training Info */}
            <div data-aos="fade-left">
              <div className="mb-4">
                <span className="text-sm text-primary-600 font-semibold bg-primary-50 px-3 py-1 rounded-full">
                  {training.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {training.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {training.short_description}
              </p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-secondary-600 mr-2" />
                  <span className="text-gray-700">{training.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-secondary-600 mr-2" />
                  <span className="text-gray-700">Max {training.max_participants} participants</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-secondary-600 mr-2" />
                  <span className="text-gray-700">{training.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-secondary-600 mr-2" />
                  <span className="text-gray-700">{training.schedule}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-secondary-600">
                  {formatRupiah(training.price)}
                </span>
                <span className="text-gray-500 ml-2">per participant</span>
              </div>

              {/* Contact Button */}
              <div>
                <a
                  href={`https://wa.me/${settings?.whatsapp_number || '6281234567890'}?text=Halo, saya tertarik dengan training ${encodeURIComponent(training.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Training Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2" data-aos="fade-up">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Details</h2>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: training.description }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6" data-aos="fade-left">
              {/* Training Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900">Requirements:</span>
                    <p className="text-gray-600 text-sm mt-1">{training.requirements}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Certification:</span>
                    <p className="text-gray-600 text-sm mt-1">{training.certification}</p>
                  </div>
                </div>
              </div>

              {/* Why Choose This Training */}
              <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose This Training?</h3>
                <div className="space-y-2">
                  {[
                    "Certified instructors with industry experience",
                    "Internationally recognized certification",
                    "Practical hands-on training approach",
                    "Small class sizes for better learning",
                    "Lifetime support and updates"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-green-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Need More Information?</h3>
                <p className="text-green-50 text-sm mb-4">
                  Our team is ready to help you choose the right training program for your needs.
                </p>
                <a
                  href={`https://wa.me/${settings?.whatsapp_number || '6281234567890'}?text=Halo, saya ingin bertanya tentang training di IMTC`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 hover:bg-green-50 px-4 py-2.5 rounded-lg font-semibold transition-colors inline-flex items-center justify-center w-full"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrainingDetailPage;