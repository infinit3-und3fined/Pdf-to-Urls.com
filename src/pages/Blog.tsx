
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDays, Search, User } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      title: "How to Extract URLs from a PDF in 5 Seconds",
      excerpt: "Learn the fastest way to find and extract all clickable links from any PDF document using our automated tool.",
      author: "PDFtoURLs Team",
      date: "January 15, 2024",
      category: "Tutorial",
      slug: "extract-urls-pdf-tutorial"
    },
    {
      title: "Best Way to Share Secure PDFs Online",
      excerpt: "Discover professional methods to share PDF documents securely with password protection and expiration dates.",
      author: "Security Expert",
      date: "January 10, 2024",
      category: "Security",
      slug: "secure-pdf-sharing-guide"
    },
    {
      title: "Generate QR Codes for Your Documents — Free and Fast",
      excerpt: "Create custom QR codes for your PDF files to enable quick sharing and mobile access for your audience.",
      author: "Tech Writer",
      date: "January 5, 2024",
      category: "Tools",
      slug: "pdf-qr-code-generator"
    },
    {
      title: "PDF Compression: Reduce File Size Without Quality Loss",
      excerpt: "Professional techniques to compress large PDF files while maintaining document quality and readability.",
      author: "PDFtoURLs Team",
      date: "December 28, 2023",
      category: "Optimization",
      slug: "compress-pdf-guide"
    },
    {
      title: "Merge Multiple PDFs: Complete Step-by-Step Guide",
      excerpt: "Learn how to combine multiple PDF documents into a single file with our easy-to-use merge tool.",
      author: "Tutorial Team",
      date: "December 20, 2023",
      category: "Tutorial",
      slug: "merge-pdf-files-guide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDFtoURLs Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tips, tutorials, and insights for better PDF management and sharing
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" asChild>
                <RouterLink to={`/blog/${post.slug}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </CardContent>
                </RouterLink>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Stay Updated</CardTitle>
                <CardDescription className="text-blue-100">
                  Get the latest PDF tips and tool updates delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Enter your email"
                    className="flex-1 bg-white text-gray-900"
                  />
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
