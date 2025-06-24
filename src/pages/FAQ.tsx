
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "How secure is my file?",
      answer: "Your files are processed securely and deleted from our servers immediately after processing. We use HTTPS encryption for all uploads and never store your personal documents permanently unless you create an account and choose to save them."
    },
    {
      question: "Can I protect PDFs with a password?",
      answer: "Yes! Our PDF to URL tool allows you to add password protection to your shared links. Only users with the correct password will be able to view or download your PDF document."
    },
    {
      question: "What's the maximum file size?",
      answer: "Free users can upload files up to 10MB. Premium users can upload files up to 100MB. If your file is larger, try using our PDF compression tool first to reduce the file size."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required for basic usage. However, creating a free account allows you to manage your uploaded files, track view statistics, and access additional features like bulk processing."
    },
    {
      question: "How long do the generated links last?",
      answer: "Generated links are permanent by default. However, you can set expiration dates for secure links, and you can always delete links from your dashboard if you have an account."
    },
    {
      question: "Can I customize the QR codes?",
      answer: "Yes! Our QR code generator allows you to customize colors and download in different formats (PNG, SVG). Premium users can also add logos to their QR codes."
    },
    {
      question: "What file formats do you support?",
      answer: "We primarily support PDF files. However, our tools can also process some other document formats like DOC, DOCX, and images in certain cases. PDF is recommended for best results."
    },
    {
      question: "Is there an API available?",
      answer: "Yes, we offer a REST API for developers who want to integrate our PDF processing tools into their applications. Contact us for API documentation and pricing."
    },
    {
      question: "Can I bulk process multiple files?",
      answer: "Premium users can process multiple files simultaneously using our batch processing feature. Free users can process files one at a time."
    },
    {
      question: "How do I track views on my shared PDFs?",
      answer: "View tracking is available for users with accounts. You can see detailed analytics including view counts, referrer information, and geographic data in your dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about PDFtoURLs tools and features
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search FAQ..."
                className="pl-10"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
              <CardDescription>
                Everything you need to know about using PDFtoURLs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Still have questions?</CardTitle>
                <CardDescription className="text-blue-100">
                  We're here to help! Contact our support team for personalized assistance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Contact Support
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
