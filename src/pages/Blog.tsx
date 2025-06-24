
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDays, Search, User, Clock, ArrowRight, FileText } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = ["All", "Tutorial", "Security", "Tools", "Updates"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
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

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      (activeCategory === "All" || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Tools Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert tips, tutorials, and updates about PDF tools and document management
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles..."
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className="rounded-full px-4"
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="bg-white/80 p-3 rounded-full">
                  <FileText className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="capitalize">
                    {post.category.toLowerCase()}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {Math.ceil(post.excerpt.split(' ').length / 200)} min read
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  <RouterLink to={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </RouterLink>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Button variant="outline" className="group">
          Load More Articles
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-blue-100 mb-4">Subscribe to our newsletter for the latest updates and tips</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-white/90 text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-white/20"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 transition-colors">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
