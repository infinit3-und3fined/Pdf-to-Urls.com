
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Share, QrCode, Link, Shield, Eye, Users, BarChart3, FileText, Zap, Star, ExternalLink, Copy, Download, Lock, Globe } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const Features = () => {
  const mainFeatures = [
    {
      icon: Link,
      title: "Extract All URLs from PDFs",
      description: "Automatically scan and extract every clickable URL from your PDF documents in seconds. Perfect for research papers, reports, and reference materials.",
      benefits: ["Instant URL detection", "Copy all links at once", "Export to CSV/TXT", "No manual searching needed"]
    },
    {
      icon: Share,
      title: "Generate Short URLs & QR Codes",
      description: "Get branded short links and instant QR codes for easy sharing anywhere. Share your PDFs professionally across all platforms.",
      benefits: ["Custom branded links", "High-quality QR codes", "Download as PNG/SVG", "Social media ready"]
    },
    {
      icon: ExternalLink,
      title: "HTML Embed Codes",
      description: "Responsive iframe snippets to embed your PDFs on any website, blog, or platform. Works seamlessly with all major CMS platforms.",
      benefits: ["Responsive design", "Easy copy-paste", "Custom sizing", "Works everywhere"]
    },
    {
      icon: Shield,
      title: "Password Protection",
      description: "Secure your sensitive documents with optional password protection. Control who can access your shared PDFs.",
      benefits: ["Custom passwords", "Secure access", "Privacy control", "Professional security"]
    },
    {
      icon: Eye,
      title: "View Analytics & Tracking",
      description: "Track views, engagement, and performance with detailed analytics. Understand how your PDFs are being accessed.",
      benefits: ["Real-time stats", "Geographic data", "Device insights", "Export reports"]
    },
    {
      icon: Users,
      title: "Easy Management Dashboard",
      description: "Organize, edit, and manage all your shared PDFs in one centralized dashboard. Keep everything organized and accessible.",
      benefits: ["Bulk operations", "Search & filter", "Quick actions", "File organization"]
    }
  ];

  const additionalFeatures = [
    { icon: Globe, title: "Global CDN", description: "Fast loading worldwide" },
    { icon: Lock, title: "SSL Encryption", description: "Secure file transmission" },
    { icon: Download, title: "Bulk Export", description: "Download all URLs at once" },
    { icon: BarChart3, title: "Usage Reports", description: "Detailed analytics reports" },
    { icon: Star, title: "No Watermarks", description: "Clean, professional sharing" },
    { icon: Zap, title: "Instant Processing", description: "Results in under 5 seconds" }
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
            <RouterLink to="/features" className="text-blue-600 font-medium">Features</RouterLink>
            <RouterLink to="/tool/pdf-link-extractor" className="text-gray-600 hover:text-blue-600 transition-colors">Tool</RouterLink>
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
          <span className="text-blue-600">Features</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
          <Zap className="w-4 h-4 mr-1" />
          Complete PDF Sharing Solution
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
          Powerful Features for PDF Sharing
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Everything you need to extract URLs from PDFs, generate short links, create QR codes, 
          and share your documents professionally. Built for students, researchers, and businesses.
        </p>

        <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
          <RouterLink to="/tool/pdf-link-extractor">
            <Upload className="w-5 h-5 mr-2" />
            Try Free Now
          </RouterLink>
        </Button>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Core Features
          </h2>
          <p className="text-lg text-gray-600">
            Professional tools that make PDF URL extraction and sharing simple and effective
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Additional Benefits
            </h2>
            <p className="text-lg text-gray-600">
              Built with performance, security, and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Perfect For
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Students & Researchers</h3>
            <p className="text-gray-600">Extract references from research papers, share study materials, and organize academic resources efficiently.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Businesses</h3>
            <p className="text-gray-600">Share proposals, reports, and presentations securely. Track engagement and maintain professional branding.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Content Creators</h3>
            <p className="text-gray-600">Embed PDFs in websites, create QR codes for offline sharing, and track content performance.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Extract URLs from Your PDFs?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands who use PDFtoURLs for professional document sharing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <RouterLink to="/tool/pdf-link-extractor">
                <Upload className="w-5 h-5 mr-2" />
                Start Extracting Now
              </RouterLink>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <RouterLink to="/signup">Create Free Account</RouterLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
