
import { Link as RouterLink } from "react-router-dom";
import { FileText } from "lucide-react";

const Terms = () => {
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
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500">Last updated: January 2024</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PDFtoURLs ("Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not 
              use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p>
              PDFtoURLs provides a platform for uploading PDF documents, extracting URLs from those documents, 
              and sharing them through generated short links, QR codes, and embed codes. The service includes 
              both free and premium features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <ul className="space-y-2">
              <li>You are responsible for the content of any PDF files you upload</li>
              <li>You must not upload copyrighted material without permission</li>
              <li>You must not use the service for illegal or harmful purposes</li>
              <li>You must not attempt to disrupt or harm the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content and Privacy</h2>
            <p>
              Uploaded PDF files are processed to extract URLs and generate sharing links. We do not store 
              the content of your PDFs permanently unless you create an account and choose to save them. 
              For more details, please review our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Service Availability</h2>
            <p>
              We strive to maintain high availability but do not guarantee uninterrupted service. The service 
              may be temporarily unavailable for maintenance, updates, or due to technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p>
              PDFtoURLs shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting on this page. Your continued use of the service constitutes acceptance of the 
              modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through our 
              support channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
