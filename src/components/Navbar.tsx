
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { FileText, ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const tools = [
    { name: "PDF to URL Generator", path: "/pdf-to-url" },
    { name: "Extract URLs from PDF", path: "/extract-urls-from-pdf" },
    { name: "Extract Images from PDF", path: "/extract-images-from-pdf" },
    { name: "PDF to QR Code", path: "/pdf-to-qr" },
    { name: "Merge PDF Files", path: "/merge-pdf-files" },
    { name: "Split PDF Pages", path: "/split-pdf-pages" },
    { name: "Compress PDF", path: "/compress-pdf" },
    { name: "Extract Text from PDF", path: "/extract-text-from-pdf" },
    { name: "Secure PDF Viewer", path: "/secure-pdf-viewer" },
    { name: "PDF to HTML Embed", path: "/pdf-to-html" },
  ];

  return (
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
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <span>Tools</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white border shadow-lg">
              {tools.map((tool) => (
                <DropdownMenuItem key={tool.path} asChild>
                  <RouterLink to={tool.path} className="w-full px-4 py-2 hover:bg-gray-50">
                    {tool.name}
                  </RouterLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <RouterLink to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</RouterLink>
          <RouterLink to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</RouterLink>
          <RouterLink to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</RouterLink>
          {isLoggedIn && (
            <RouterLink to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">My Files</RouterLink>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="hidden md:flex">
                Dashboard
              </Button>
              <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')} className="hidden md:flex">
                Login
              </Button>
              <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Sign Up Free
              </Button>
            </>
          )}
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Tools</p>
              {tools.map((tool) => (
                <RouterLink
                  key={tool.path}
                  to={tool.path}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {tool.name}
                </RouterLink>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <RouterLink to="/blog" className="block px-4 py-2 text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Blog</RouterLink>
              <RouterLink to="/faq" className="block px-4 py-2 text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>FAQ</RouterLink>
              <RouterLink to="/about" className="block px-4 py-2 text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>About</RouterLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
