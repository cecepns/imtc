import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { settingsAPI } from '../../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Use default values
        setSettings({
          company_name: 'IMTC Global Training',
          company_address: 'Jakarta, Indonesia',
          company_phone: '+62 21 1234 5678',
          company_email: 'info@imtcglobal.com',
          about_us: 'International Maritime Training Center - Leading provider of Occupational Health and Safety (K3) training for maritime and heavy industries.',
          facebook_url: '',
          instagram_url: 'https://www.instagram.com/imtcofficial/',
          linkedin_url: ''
        });
      }
    };

    fetchSettings();
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">{settings.company_name || 'IMTC Global'}</span>
            </div>
            <p className="text-gray-400 mb-4">
              {settings.about_us || 'International Maritime Training Center - Leading provider of Occupational Health and Safety (K3) training for maritime and heavy industries.'}
            </p>
            <div className="flex space-x-4">
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/trainings" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Trainings
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  {settings.company_address || 'Jakarta, Indonesia'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <p className="text-gray-400 text-sm">{settings.company_phone || '+62 21 1234 5678'}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <p className="text-gray-400 text-sm">{settings.company_email || 'info@imtcglobal.com'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.company_name || 'IMTC Global Training'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;