
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Upload, Share, QrCode, Link, Shield, Eye, FileText, Zap, Star, ExternalLink, Copy, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import FileUploadZone from "@/components/FileUploadZone";

const ToolPage = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Upload Your PDF",
      description: "Drag and drop your PDF file or click to browse. Files up to 10MB are supported.",
      icon: Upload
    },
    {
      number: 2,
      title: "Extract URLs Automatically",
      description: "Our AI instantly scans your PDF and extracts all clickable URLs and links.",
      icon: Link
    },
    {
      number: 3,
      title: "Get Sharing Options",
      description: "Receive short links, QR codes, and embed codes ready for sharing anywhere.",
      icon: Share
    }
  ];

  const faqs = [
    {
      question: "How do I extract URLs from a PDF file?",
      answer: "Simply upload your PDF file using our tool above. Our system will automatically scan the document and extract all clickable URLs, links, and references. The process takes just a few seconds and you'll get a complete list of all URLs found in your PDF."
    },
    {
      question: "What file size limit is there for PDF uploads?",
      answer: "Free users can upload PDF files up to 10MB in size. This covers most documents including research papers, reports, presentations, and manuals. Premium users get higher limits and additional features."
    },
    {
      question: "Can I share my PDF with a password?",
      answer: "Yes! You can add password protection to your shared PDF links. This ensures only people with the password can access your document, perfect for sensitive or confidential materials."
    },
    {
      question: "How do I generate a QR code for my PDF?",
      answer: "After uploading your PDF, we automatically generate a QR code that links directly to your document. You can download the QR code as a PNG or SVG file and use it in print materials, presentations, or anywhere else."
    },
    {
      question: "Can I embed the PDF on my website?",
      answer: "Absolutely! We provide responsive HTML embed codes that you can copy and paste into any website, blog, or CMS. The embedded PDF viewer works on all devices and platforms."
    },
    {
      question: "Is there a limit to how many URLs can be extracted?",
      answer: "No, there's no limit. Our tool will extract every single URL found in your PDF, whether it's 5 links or 500 links. All URLs are displayed in an organized list with copy and export options."
    },
    {
      question: "Can I track views on my shared PDFs?",
      answer: "Yes, when you create an account, you get access to view analytics showing how many people have accessed your PDF, when they viewed it, and basic geographic information."
    },
    {
      question: "What formats can I export the extracted URLs to?",
      answer: "You can copy all URLs to your clipboard, download them as a CSV file for spreadsheet use, or export as a TXT file. This makes it easy to use the extracted URLs in other tools and applications."
    }
  ];

  const benefits = [
    "Extract all URLs from any PDF instantly",
    "Generate branded short links automatically",
    "Create high-quality QR codes (PNG/SVG)",
    "Get responsive HTML embed codes",
    "Add password protection for security",
    "Track views with detailed analytics",
    "Export URLs in multiple formats",
    "Works with any PDF size or complexity"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <RouterLink to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDFtoURLs
            </RouterLink>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <RouterLink to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</RouterLink>
            <RouterLink to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</RouterLink>
            <RouterLink to="/tool/pdf-link-extractor" className="text-blue-600 font-medium">Tool</RouterLink>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <RouterLink to="/login">Login</RouterLink>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <RouterLink to="/signup">Sign Up Free</RouterLink>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <RouterLink to="/" className="hover:text-blue-600">Home</RouterLink>
          <span className="mx-2">/</span>
          <RouterLink to="/tool/pdf-link-extractor" className="text-blue-600">PDF Link Extractor Tool</RouterLink>
        </nav>
      </div>

      {/* Hero Section with Tool */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            <Zap className="w-4 h-4 mr-1" />
            Free PDF URL Extraction Tool
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Extract URLs from PDF Online Free
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload any PDF file and instantly extract all clickable URLs and links. Get short links, 
            QR codes, and embed codes for professional sharing. No signup required to get started.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="max-w-4xl mx-auto mb-16">
          <FileUploadZone />
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg p-4">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How to Extract URLs from PDF Files
            </h2>
            <p className="text-xl text-gray-600">Simple 3-step process to get all URLs from any PDF</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">{step.number}</span>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Guide */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Guide: Extract Links from PDF Documents
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              PDF documents often contain valuable URLs and links to external resources, websites, and references. 
              Whether you're working with research papers, business reports, or educational materials, extracting 
              these URLs manually can be time-consuming and error-prone.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Extract URLs from PDFs?</h3>
            <ul className="space-y-2">
              <li><strong>Research Efficiency:</strong> Quickly gather all reference links from academic papers</li>
              <li><strong>Content Curation:</strong> Collect valuable resources mentioned in reports and guides</li>
              <li><strong>Link Building:</strong> Find relevant websites and resources for SEO purposes</li>
              <li><strong>Quality Assurance:</strong> Verify all links in documents are working and accessible</li>
              <li><strong>Data Migration:</strong> Transfer references when converting between document formats</li>
            </ul>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Who Benefits from PDF URL Extraction?</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold mb-2">Students & Researchers</h4>
                <p>Extract bibliography links, research references, and academic resources from papers and dissertations.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Professionals</h4>
                <p>Gather competitor links, industry resources, and partnership opportunities from business documents.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Creators</h4>
                <p>Find inspiration sources, reference materials, and potential collaboration opportunities.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">SEO Specialists</h4>
                <p>Discover link building opportunities and analyze competitor backlink strategies.</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Features</h3>
            <p>
              Beyond simple URL extraction, our tool provides professional sharing features that make your 
              PDF documents more accessible and trackable:
            </p>
            <ul className="space-y-2">
              <li><strong>Short Link Generation:</strong> Create branded, professional links for easy sharing</li>
              <li><strong>QR Code Creation:</strong> Generate scannable codes for offline-to-online bridging</li>
              <li><strong>Embed Codes:</strong> Get responsive iframe snippets for website integration</li>
              <li><strong>Password Protection:</strong> Secure sensitive documents with access controls</li>
              <li><strong>Analytics Tracking:</strong> Monitor views, engagement, and document performance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about extracting URLs from PDFs
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border-0 shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Start Extracting URLs from Your PDFs Today</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands who trust PDFtoURLs for professional document sharing and URL extraction.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Upload className="w-5 h-5 mr-2" />
              Upload PDF & Extract Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <RouterLink to="/signup">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </RouterLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <p className="text-gray-400">Professional PDF URL extraction made simple.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><RouterLink to="/features" className="hover:text-white transition-colors">Features</RouterLink></li>
                <li><RouterLink to="/tool/pdf-link-extractor" className="hover:text-white transition-colors">Tool</RouterLink></li>
                <li><RouterLink to="/pricing" className="hover:text-white transition-colors">Pricing</RouterLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><RouterLink to="/help" className="hover:text-white transition-colors">Help Center</RouterLink></li>
                <li><RouterLink to="/contact" className="hover:text-white transition-colors">Contact</RouterLink></li>
                <li><RouterLink to="/status" className="hover:text-white transition-colors">Status</RouterLink></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><RouterLink to="/terms" className="hover:text-white transition-colors">Terms</RouterLink></li>
                <li><RouterLink to="/privacy" className="hover:text-white transition-colors">Privacy</RouterLink></li>
                <li><RouterLink to="/about" className="hover:text-white transition-colors">About</RouterLink></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PDFtoURLs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ToolPage;
