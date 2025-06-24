
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Lock, FileText, User, Clock, Zap, Code, Image, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  { id: 'general', name: 'General', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  { id: 'security', name: 'Security', icon: <Lock className="w-4 h-4 mr-2" /> },
  { id: 'features', name: 'Features', icon: <Zap className="w-4 h-4 mr-2" /> },
  { id: 'account', name: 'Account', icon: <User className="w-4 h-4 mr-2" /> },
  { id: 'billing', name: 'Billing', icon: <FileText className="w-4 h-4 mr-2" /> },
];

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'security':
      return <Lock className="w-5 h-5 text-blue-500" />;
    case 'features':
      return <Zap className="w-5 h-5 text-purple-500" />;
    case 'account':
      return <User className="w-5 h-5 text-green-500" />;
    case 'billing':
      return <FileText className="w-5 h-5 text-yellow-500" />;
    default:
      return <MessageSquare className="w-5 h-5 text-blue-500" />;
  }
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
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
      answer: "View tracking is available for users with accounts. You can see detailed analytics including view counts, referrer information, and geographic data in your dashboard.",
      category: 'account'
    }
  ];

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === 'general' || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our PDF tools and services
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search FAQs..."
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories */}
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="flex-1">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`} className="border-0">
                      <AccordionTrigger className="hover:no-underline px-6 py-4">
                        <div className="flex items-center">
                          {getCategoryIcon(faq.category || 'general')}
                          <span className="ml-3 font-medium text-left">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        <div className="pl-8">
                          <p>{faq.answer}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">
                We couldn't find any FAQs matching your search. Try different keywords or check back later.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('general');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold mb-3">Still have questions?</h3>
                <p className="text-blue-100 mb-6 md:mb-0">
                  Can't find the answer you're looking for? Our support team is here to help you 24/7.
                </p>
              </div>
              <div className="space-y-3 sm:space-y-0 sm:space-x-3">
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-50 w-full sm:w-auto">
                  Contact Support
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
