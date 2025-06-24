
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Share, QrCode, Link, Shield, ExternalLink, Users, BarChart3, Settings, FileText, Zap, Star, Eye, Download, Image, Merge, Split, Shrink } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";

const Index = () => {
  const tools = [
    {
      icon: Link,
      title: "PDF to URL Generator",
      description: "Upload PDF and generate short URL, QR code, and HTML embed",
      path: "/pdf-to-url",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ExternalLink,
      title: "Extract URLs from PDF",
      description: "Find and extract all clickable links from your PDF documents",
      path: "/extract-urls-from-pdf",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Image,
      title: "Extract Images from PDF",
      description: "Extract all images from PDF and download as zip file",
      path: "/extract-images-from-pdf",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: QrCode,
      title: "PDF to QR Code",
      description: "Generate customizable QR codes for your PDF files",
      path: "/pdf-to-qr",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Merge,
      title: "Merge PDF Files",
      description: "Combine multiple PDF files into one document",
      path: "/merge-pdf-files",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Split,
      title: "Split PDF Pages",
      description: "Split PDF into separate pages or custom ranges",
      path: "/split-pdf-pages",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Shrink,
      title: "Compress PDF File",
      description: "Reduce PDF file size without losing quality",
      path: "/compress-pdf",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: FileText,
      title: "Extract Text from PDF",
      description: "Extract all text content from PDF documents",
      path: "/extract-text-from-pdf",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "Secure PDF Viewer",
      description: "Create password-protected PDF viewer with expiration",
      path: "/secure-pdf-viewer",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Settings,
      title: "PDF to HTML Embed",
      description: "Generate responsive iframe embed codes for websites",
      path: "/pdf-to-html",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            <Zap className="w-4 h-4 mr-1" />
            10 Professional PDF Tools - Free & Instant
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Turn PDFs into Smart Links, QR Codes & Embeds — Instantly
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload any PDF and access 10 powerful tools: generate shareable links, extract URLs/images/text, 
            create QR codes, merge/split files, and more. Perfect for students, freelancers, and businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8" asChild>
              <RouterLink to="/pdf-to-url">
                <Upload className="w-5 h-5 mr-2" />
                Start Free - Upload PDF
              </RouterLink>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <RouterLink to="/features">
                <ExternalLink className="w-5 h-5 mr-2" />
                View All Tools
              </RouterLink>
            </Button>
          </div>

          {/* Upload Zone */}
          <div className="mb-16">
            <FileUploadZone />
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 text-gray-500 mb-16">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>500K+ PDFs Processed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            10 Professional PDF Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for PDF processing, sharing, and management in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md group">
              <RouterLink to={tool.path}>
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </RouterLink>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and secure</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Upload PDF</h3>
              <p className="text-gray-600">Drag and drop your PDF file or click to browse (up to 10MB free)</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Choose Tool</h3>
              <p className="text-gray-600">Select from 10 professional tools to process your PDF</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Get Results</h3>
              <p className="text-gray-600">Download, copy, or share your results instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your PDFs?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who trust PDFtoURLs for professional document processing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <RouterLink to="/pdf-to-url">
                <Upload className="w-5 h-5 mr-2" />
                Start Processing Now
              </RouterLink>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <RouterLink to="/signup">
                Create Free Account
              </RouterLink>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
