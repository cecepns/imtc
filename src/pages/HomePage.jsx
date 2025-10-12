import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Award, Clock, CircleCheck as CheckCircle, Star } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { trainingAPI } from '../utils/api';

const HomePage = () => {
  const [featuredTrainings, setFeaturedTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedTrainings = async () => {
      try {
        const response = await trainingAPI.getAll(1, 3);
        setFeaturedTrainings(response.data.trainings);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTrainings();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-600 to-secondary-800 text-white pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leading Maritime Training Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-100">
              Professional Occupational Health and Safety (OHS) training for maritime and heavy industries with more than 5 years of experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/trainings"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                View Our Training <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border border-white hover:bg-white hover:text-secondary-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">5+</div>
                <div className="text-blue-100 font-medium">Years Experience</div>
              </div>
            </div>
            <div className="text-center group" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
                <div className="text-purple-100 font-medium">Trained Professionals</div>
              </div>
            </div>
            <div className="text-center group" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-orange-100 font-medium">Training Programs</div>
              </div>
            </div>
            <div className="text-center group" data-aos="fade-up" data-aos-delay="400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">99%</div>
                <div className="text-green-100 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Training Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive safety training programs designed to meet international standards and industry needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-white" />,
                title: "General OHS Training",
                description: "Comprehensive certification covering hazard identification, risk assessment, and compliance with safety standards.",
                gradient: "from-blue-500 to-indigo-600",
                iconBg: "bg-blue-600"
              },
              {
                icon: <Users className="h-12 w-12 text-white" />,
                title: "Maritime OHS Training",
                description: "Specialized programs for the maritime sector covering ship safety, emergency evacuation, and hazardous materials handling.",
                gradient: "from-cyan-500 to-blue-600",
                iconBg: "bg-cyan-600"
              },
              {
                icon: <Award className="h-12 w-12 text-white" />,
                title: "Scaffolding Supervisor",
                description: "Supervisor training in scaffolding assembly, inspection, and safe use according to occupational safety standards.",
                gradient: "from-purple-500 to-indigo-600",
                iconBg: "bg-purple-600"
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`relative group bg-gradient-to-br ${service.gradient} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className={`${service.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-blue-50 leading-relaxed">{service.description}</p>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 translate-y-16"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trainings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular and comprehensive training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-16 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              featuredTrainings.map((training, index) => (
                <div
                  key={training.id}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative overflow-hidden w-full h-96">
                    <img
                      src={training.image ? (training.image.startsWith('http') ? training.image : `https://api-inventory.isavralabel.com/imtc/uploads/${training.image}`) : 'https://images.pexels.com/photos/5668849/pexels-photo-5668849.jpeg'}
                      alt={training.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-1.5 rounded-full shadow-md">
                        {training.category}
                      </span>
                      <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-orange-500 mr-1" />
                        <span className="text-sm text-orange-700 font-medium">{training.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{training.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{training.short_description}</p>
                    <Link
                      to={`/training/${training.id}`}
                      className="inline-flex items-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full"></div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/trainings"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Training <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose IMTC Global?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing world-class training with proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4" data-aos="fade-right">
              {[
                "Certified training programs accredited by government and industry authorities",
                "Flexible schedules with various training dates and locations",
                "Expert instructors with years of industry experience",
                "Customized training solutions for your team's specific needs",
                "Internationally recognized certifications"
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-x-1 border-l-4 border-blue-500">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-1.5 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-2xl shadow-2xl overflow-hidden" data-aos="fade-left">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
              <div className="relative text-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                  <Star className="h-10 w-10 text-yellow-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Excellence in Training</h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  More than 5 years of experience in providing high-quality safety training for maritime and heavy industries.
                </p>
              </div>
              <div className="relative text-center">
                <Link
                  to="/about"
                  className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Learn About Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Participant Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear the experiences of those who have attended our training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Budi Santoso",
                position: "Safety Officer",
                // company: "PT Pelayaran Nusantara",
                image: "https://i.pravatar.cc/150?img=12",
                rating: 5,
                testimonial: "The Maritime OHS Training at IMTC Global is very comprehensive and practical. The instructors are highly experienced and the materials taught are very relevant to my work on board. The certification I received is also internationally recognized."
              },
              {
                name: "Siti Nurhaliza",
                position: "HSE Supervisor",
                // company: "PT Konstruksi Megah",
                image: "https://i.pravatar.cc/150?img=45",
                rating: 5,
                testimonial: "I am very satisfied with the Scaffolding Supervisor training I attended. The facilities are complete, the interactive learning method made me quickly understand the material. The instructor team is very professional and always ready to help."
              },
              {
                name: "Ahmad Wijaya",
                position: "Operations Manager",
                // company: "PT Offshore Indonesia",
                image: "https://i.pravatar.cc/150?img=33",
                rating: 5,
                testimonial: "IMTC Global is the best OHS training center I have ever visited. The training I attended greatly helped improve my team's competence in managing occupational safety in high-risk offshore environments."
              },
              // {
              //   name: "Dewi Lestari",
              //   position: "Training Coordinator",
              //   company: "PT Industri Maritim",
              //   image: "https://i.pravatar.cc/150?img=47",
              //   rating: 5,
              //   testimonial: "We have sent employees for training at IMTC Global several times. The results are always satisfactory. The flexible training schedule and strategic location make it easy to coordinate with our team."
              // },
              // {
              //   name: "Rudi Hartono",
              //   position: "Site Safety Inspector",
              //   company: "PT Pembangunan Infrastruktur",
              //   image: "https://i.pravatar.cc/150?img=68",
              //   rating: 5,
              //   testimonial: "The General OHS training materials provided are very detailed and easy to understand. I gained a lot of new knowledge about hazard identification and how to manage risks in the field. Thank you IMTC Global!"
              // },
              // {
              //   name: "Linda Kusuma",
              //   position: "Safety Engineer",
              //   company: "PT Energi Nusantara",
              //   image: "https://i.pravatar.cc/150?img=38",
              //   rating: 5,
              //   testimonial: "An amazing training experience! The instructors are not only experts in their field, but they can also deliver the material in an easy-to-understand way. The certificate I received is very useful for my career development."
              // }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-blue-200 opacity-50">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-1.5 shadow-lg">
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.position}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16" data-aos="fade-up">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              Join thousands of professionals who have trusted us
            </p>
            <Link
              to="/trainings"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Register for Training Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;