
import { Link as RouterLink } from "react-router-dom";
import { FileText, Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                PDFtoURLs
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Transform PDFs into shareable links and QR codes instantly.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Blog', 'FAQ'].map((item) => (
                <li key={item}>
                  <RouterLink 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-4">Tools</h4>
            <ul className="space-y-2">
              {['PDF to URL', 'Extract URLs', 'PDF to QR', 'Compress PDF'].map((tool) => (
                <li key={tool}>
                  <RouterLink 
                    to={`/${tool.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {tool}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-4">Contact</h4>
            <div className="space-y-2">
              <a 
                href="mailto:support@pdftourls.com" 
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                support@pdftourls.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} PDFtoURLs. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <RouterLink 
                key={item}
                to={`/${item.toLowerCase()}`} 
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {item}
              </RouterLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
