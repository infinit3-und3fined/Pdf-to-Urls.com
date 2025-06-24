
import { Link as RouterLink } from "react-router-dom";
import { FileText } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <RouterLink to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDFtoURLs
            </RouterLink>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500">Last updated: January 2024</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <h3 className="text-lg font-semibold mb-2">PDF Files and Content</h3>
            <p>
              When you upload a PDF file, we temporarily process it to extract URLs and generate sharing options. 
              For anonymous users, files are processed and deleted immediately after processing. For registered 
              users, files may be stored in your account for management purposes.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <p>
              If you create an account, we collect your email address, name, and any profile information you provide.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Usage Analytics</h3>
            <p>
              We collect anonymous usage statistics to improve our service, including page views, feature usage, 
              and basic technical information like browser type and IP address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="space-y-2">
              <li>Process PDF files to extract URLs and generate sharing links</li>
              <li>Provide and improve our services</li>
              <li>Send important service notifications (if you have an account)</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Ensure security and prevent abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data. PDF files 
              are processed using secure, encrypted connections. Account data is stored with industry-standard 
              security measures including encryption at rest and in transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="space-y-2 mt-2">
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p>
              We use essential cookies to provide our service and optional analytics cookies to understand 
              how users interact with our platform. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Object to certain processing activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
            <p>
              Anonymous PDF processing: Files are deleted immediately after processing. Account data: 
              Retained while your account is active and for a reasonable period after deletion for 
              legal and administrative purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy periodically. Changes will be posted on this page with 
              an updated revision date. For significant changes, we may provide additional notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact us 
              through our support channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
