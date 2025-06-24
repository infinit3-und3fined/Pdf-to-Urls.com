
import { Link as RouterLink } from "react-router-dom";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PDFtoURLs</span>
            </div>
            <p className="text-gray-400">Turn PDFs into smart links, QR codes, and embeds instantly.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li><RouterLink to="/pdf-to-url" className="hover:text-white transition-colors">PDF to URL</RouterLink></li>
              <li><RouterLink to="/extract-urls-from-pdf" className="hover:text-white transition-colors">Extract URLs</RouterLink></li>
              <li><RouterLink to="/pdf-to-qr" className="hover:text-white transition-colors">PDF to QR</RouterLink></li>
              <li><RouterLink to="/compress-pdf" className="hover:text-white transition-colors">Compress PDF</RouterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><RouterLink to="/faq" className="hover:text-white transition-colors">FAQ</RouterLink></li>
              <li><RouterLink to="/blog" className="hover:text-white transition-colors">Blog</RouterLink></li>
              <li><RouterLink to="/about" className="hover:text-white transition-colors">About</RouterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><RouterLink to="/terms" className="hover:text-white transition-colors">Terms</RouterLink></li>
              <li><RouterLink to="/privacy" className="hover:text-white transition-colors">Privacy</RouterLink></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PDFtoURLs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
