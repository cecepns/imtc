import { useState, useEffect } from 'react';
import { Save, MapPin, Phone, Mail, Globe, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { settingsAPI } from '../../utils/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    whatsapp_number: '',
    company_maps: '',
    about_us: '',
    vision: '',
    mission: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Set default values
        setSettings({
          company_name: 'IMTC Global Training',
          company_address: 'Jakarta, Indonesia',
          company_phone: '+62 21 1234 5678',
          company_email: 'info@imtcglobal.com',
          whatsapp_number: '6281234567890',
          company_maps: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123',
          about_us: 'International Maritime Training Center (IMTC) is a leading training provider focused on Occupational Health and Safety (K3) for the maritime and other heavy industries. With over 5 years of experience, we are committed to improving safety awareness and skills for workers across Indonesia.',
          vision: 'To become the leading Occupational Health and Safety (K3) training center in Asia, focusing on enhancing safety skills and awareness for workers in the maritime and heavy industries.',
          mission: 'Provide high-quality training with international standards to promote K3 in various industries. Develop training programs that are relevant to current and future industry needs. Raise workplace safety awareness and knowledge through innovative and effective approaches.',
          facebook_url: 'https://facebook.com/imtcglobal',
          instagram_url: 'https://instagram.com/imtcglobal',
          linkedin_url: 'https://linkedin.com/company/imtcglobal'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await settingsAPI.update(settings);
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('Error updating settings. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-gray-200 rounded w-1/6 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Settings</h1>
          <p className="text-gray-600">Manage your website information and content</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Globe className="mr-2 h-5 w-5 text-secondary-600" />
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={settings.company_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="company_email"
                    value={settings.company_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="company_phone"
                    value={settings.company_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="whatsapp_number"
                    value={settings.whatsapp_number}
                    onChange={handleInputChange}
                    placeholder="6281234567890 (without + or spaces)"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Enter number with country code, without + or spaces (e.g., 6281234567890)
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <textarea
                    name="company_address"
                    value={settings.company_address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps Embed URL
              </label>
              <input
                type="url"
                name="company_maps"
                value={settings.company_maps}
                onChange={handleInputChange}
                placeholder="https://maps.google.com/embed?pb=..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
              />
              <p className="text-sm text-gray-500 mt-1">
                Get the embed URL from Google Maps by clicking &quot;Share&quot; → &quot;Embed a map&quot;
              </p>
            </div>
          </div>

          {/* About Us Content */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">About Us Content</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Us Description
                </label>
                <textarea
                  name="about_us"
                  value={settings.about_us}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                  placeholder="Write about your company..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Statement
                </label>
                <textarea
                  name="vision"
                  value={settings.vision}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                  placeholder="Your company's vision..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  name="mission"
                  value={settings.mission}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors resize-none"
                  placeholder="Your company's mission..."
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Social Media Links</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook URL
                </label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="url"
                    name="facebook_url"
                    value={settings.facebook_url}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram URL
                </label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="url"
                    name="instagram_url"
                    value={settings.instagram_url}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/yourpage"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="url"
                    name="linkedin_url"
                    value={settings.linkedin_url}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/company/yourcompany"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-secondary-600 hover:bg-secondary-700 disabled:bg-secondary-400 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;