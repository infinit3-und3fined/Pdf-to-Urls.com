
import { Link as RouterLink } from "react-router-dom";
import { FileText, Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                PDFtoURLs
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your PDFs into shareable links, QR codes, and embeds with our powerful and easy-to-use tools.
              Perfect for businesses, educators, and content creators.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <RouterLink 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </RouterLink>
              </li>
              <li>
                <RouterLink 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blog
                </RouterLink>
              </li>
              <li>
                <RouterLink 
                  to="/faq" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Tools</h4>
            <ul className="space-y-3">
              <li>
                <RouterLink 
                  to="/pdf-to-url" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  PDF to URL
                </RouterLink>
              </li>
              <li>
                <RouterLink 
                  to="/extract-urls-from-pdf" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Extract URLs
                </RouterLink>
              </li>
              <li>
                <RouterLink 
                  to="/pdf-to-qr" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  PDF to QR Code
                </RouterLink>
              </li>
              <li>
                <RouterLink 
                  to="/compress-pdf" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Compress PDF
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Email us at</p>
                  <a href="mailto:support@pdftourls.com" className="text-white hover:text-blue-400 transition-colors text-sm">
                    support@pdftourls.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Have questions or need help? Our support team is here to assist you.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} PDFtoURLs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <RouterLink to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </RouterLink>
            <RouterLink to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </RouterLink>
            <RouterLink to="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
