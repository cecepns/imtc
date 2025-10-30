import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  CircleCheck as CheckCircle,
  Target,
  Eye,
  Users,
  Award,
  Globe,
} from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { settingsAPI } from "../utils/api";

const AboutPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>
          About IMTC Global - Leading Maritime & OHS Training Provider
        </title>
        <meta
          name="description"
          content="IMTC Global is a certified training provider with 5+ years experience in Occupational Health and Safety (K3) for maritime and heavy industries. Trusted by 1000+ professionals across Indonesia."
        />
        <meta
          name="keywords"
          content="about IMTC, maritime training center, OHS training provider, K3 certification, safety training Indonesia, maritime safety education"
        />
        <link rel="canonical" href="https://imtc-global.com/about" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About IMTC Global - Leading Maritime Training Provider"
        />
        <meta
          property="og:description"
          content="5+ years of experience in providing professional Occupational Health and Safety training for maritime and heavy industries."
        />
        <meta property="og:url" content="https://imtc-global.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="About IMTC Global - Leading Maritime Training Provider"
        />
        <meta
          name="twitter:description"
          content="5+ years of experience in providing professional Occupational Health and Safety training for maritime and heavy industries."
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "EducationalOrganization",
              name: "IMTC Global",
              description:
                "Leading Maritime Training Center providing professional Occupational Health and Safety (OHS) training",
              foundingDate: "2018",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Indonesia",
              },
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-600 to-secondary-800 text-white pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About IMTC Global
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-100">
              Leading the way in maritime safety training and professional development.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tentang IMTC
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  PT PPSMI/International Maritime Training Center (IMTC) adalah
                  perusahaan yang bermitra dengan penyedia jasa K3 (PJK3) serta
                  Tempat Uji Kompetensi (TUK) dari berbagai LSP-BNSP di
                  Indonesia. Dengan pengalaman lebih dari 5 tahun, kami
                  berkomitmen untuk mencetak profesional muda yang mempunyai
                  skill dan kompetensi sesuai kebutuhan industri melalui
                  berbagai program pelatihan bersertifikat yang diakui oleh
                  lembaga pemerintah.
                </p>
                <p>
                  Kami menghadirkan pelatihan menyeluruh untuk mendukung
                  terciptanya tempat kerja yang lebih aman, efisien, dan
                  produktif. Sebagai mitra terpercaya, kami berkomitmen
                  mengembangkan SDM kompeten di sektor maritim dan industri
                  berat, guna meningkatkan standar keselamatan dan
                  profesionalisme di Indonesia
                </p>
              </div>
            </div>
            <div
              className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-xl"
              data-aos="fade-left"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-gray-600">Trained Professionals</div>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600">Training Programs</div>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div
              className="bg-white p-8 rounded-xl shadow-lg border"
              data-aos="fade-up"
            >
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-secondary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Visi Kami</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi perusahaan yang mencetak generasi muda yang unggul dari
                Sabang sampai Merauke, untuk menjadi profesional muda yang punya
                pengetahuan luas, skill, serta kompetensi baik nasional dan
                internasional menuju Indonesia emas yang maju dan sejahtera
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-lg border"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Misi Kami</h3>
              </div>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Merancang dan melaksanakan program pelatihan yang relevan
                    dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI)
                    dan kebutuhan industri
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Membekali peserta dengan pengetahuan dan keterampilan
                    praktis untuk lulus uji kompetensi BNSP dan KEMNAKER
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Menjalin kolaborasi dengan industri, asosiasi profesi, dan
                    lembaga terkait
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Menyiapkan lulusan yang memiliki kompetensi dan siap bekerja
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Mendorong terwujudnya budaya keselamatan kerja di setiap
                    tingkat organisasi
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Services */}
          <div className="mb-20">
            <h2
              className="text-3xl font-bold text-gray-900 text-center mb-12"
              data-aos="fade-up"
            >
              Kategori Pelatihan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Pelatihan K3 (Keselamatan dan Kesehatan Kerja)",
                  description:
                    "Program komprehensif mencakup Operator K3 Umum, Operator K3 Migas, Operator K3 Listrik, Ahli K3 Umum, Pengawas K3 Migas, Pengawas Scaffolding, Ruang Terbatas, Rigger, Fire Safety Officer, First Aid, dan Inspektur Pesawat Angkat Angkut.",
                },
                {
                  title: "Pelatihan Operator Alat Berat",
                  description:
                    "Pelatihan spesialis untuk operasi peralatan berat termasuk Operator Forklift, Overhead Crane, Pedestal Crane, Excavator, Backhoe, Loader, Dumptruck, dan Dozer dengan standar keselamatan internasional.",
                },
                {
                  title: "Pelatihan Gas & Keselamatan Khusus",
                  description:
                    "Program khusus untuk penanganan gas berbahaya mencakup Authorized Gas Tester dan Petugas Gas H2S dengan prosedur dan protokol keselamatan yang ketat.",
                },
                {
                  title: "Pelatihan Penunjang Profesional",
                  description:
                    "Program pengembangan profesional mencakup Training of Trainer, English for HSE, dan Digital Marketing untuk meningkatkan kompetensi dan keterampilan tambahan.",
                },
                {
                  title: "Pelatihan Internasional",
                  description:
                    "Sertifikasi internasional bereputasi meliputi IOSH Managing Safely, EOSH Environmental Sustainability, EOSH Accident Investigation, dan EOSH Emergency First Aid at Work.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2
              className="text-3xl font-bold text-gray-900 text-center mb-12"
              data-aos="fade-up"
            >
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "Apakah IMTC menyediakan pelatihan online?",
                  answer:
                    "Ya, IMTC menyediakan program pelatihan online (online class) yang memungkinkan peserta mengikuti pembelajaran secara fleksibel, kapan saja dan di mana saja.",
                },
                {
                  question:
                    "Apakah program pelatihan IMTC diakui oleh pemerintah?",
                  answer:
                    "Ya, seluruh program pelatihan kami telah terakreditasi oleh Kementerian Ketenagakerjaan (KEMNAKER) serta diakui oleh lembaga sertifikasi internasional.",
                },
                {
                  question:
                    "Bagaimana cara mendapatkan sertifikat setelah menyelesaikan pelatihan?",
                  answer:
                    "Setelah menyelesaikan pelatihan, peserta akan mengikuti ujian sertifikasi. Jika dinyatakan lulus, peserta akan menerima sertifikat resmi yang diakui secara nasional maupun internasional.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div
            className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl p-8 md:p-12 text-white"
            data-aos="fade-up"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose IMTC Global Training?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Certified training programs recognized by government agencies and industry authorities",
                "Flexible schedules with various training times and locations available",
                "Experienced instructors with extensive expertise and track record in the industry",
                "Customized training solutions that can be tailored to meet your team or company needs",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-200 mt-0.5 flex-shrink-0" />
                  <p className="text-primary-50">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
