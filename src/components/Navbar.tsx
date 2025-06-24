import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  ChevronDown, 
  Menu, 
  X, 
  FileSearch, 
  Image as FileImage,
  QrCode, 
  Merge, 
  Split, 
  Shrink, 
  Shield, 
  Code, 
  ExternalLink,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NavLink = ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <RouterLink 
      to={to}
      onClick={onClick}
      className={cn(
        'px-3 py-2 text-sm font-medium transition-colors rounded-lg',
        isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100',
        className
      )}
    >
      {children}
    </RouterLink>
  );
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    {
      name: 'PDF to URL',
      description: 'Convert PDF to shareable link',
      path: '/pdf-to-url',
      icon: <ExternalLink className="w-4 h-4 mr-2 text-blue-500" />
    },
    {
      name: 'Extract URLs',
      description: 'Extract all URLs from PDF',
      path: '/extract-urls-from-pdf',
      icon: <FileSearch className="w-4 h-4 mr-2 text-green-500" />
    },
    {
      name: 'PDF to QR',
      description: 'Generate QR code for PDF',
      path: '/pdf-to-qr',
      icon: <QrCode className="w-4 h-4 mr-2 text-purple-500" />
    },
    {
      name: 'Merge PDFs',
      description: 'Combine multiple PDFs into one',
      path: '/merge-pdf-files',
      icon: <Merge className="w-4 h-4 mr-2 text-orange-500" />
    },
    {
      name: 'Split PDF',
      description: 'Split PDF into multiple files',
      path: '/split-pdf-pages',
      icon: <Split className="w-4 h-4 mr-2 text-red-500" />
    },
    {
      name: 'Compress PDF',
      description: 'Reduce PDF file size',
      path: '/compress-pdf',
      icon: <Shrink className="w-4 h-4 mr-2 text-yellow-500" />
    },
    {
      name: 'Extract Text',
      description: 'Extract text from PDF',
      path: '/extract-text-from-pdf',
      icon: <FileText className="w-4 h-4 mr-2 text-teal-500" />
    },
    {
      name: 'Extract Images',
      description: 'Extract images from PDF',
      path: '/extract-images-from-pdf',
      icon: <FileImage className="w-4 h-4 mr-2 text-pink-500" />
    },
    {
      name: 'Secure Viewer',
      description: 'View PDFs securely',
      path: '/secure-pdf-viewer',
      icon: <Shield className="w-4 h-4 mr-2 text-indigo-500" />
    },
    {
      name: 'PDF to HTML',
      description: 'Convert PDF to HTML',
      path: '/pdf-to-html',
      icon: <Code className="w-4 h-4 mr-2 text-cyan-500" />
    }
  ];

  const toggleTools = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RouterLink to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PDF Tools
              </span>
            </RouterLink>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              <NavLink to="/">Home</NavLink>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors focus:outline-none">
                  <span>Tools</span>
                  <ChevronDown className="w-4 h-4 mt-0.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[600px] p-4 bg-white/95 backdrop-blur-lg border border-slate-200 shadow-xl rounded-xl overflow-hidden">
                  <DropdownMenuLabel className="text-slate-900 font-semibold px-2 py-1.5">
                    All PDF Tools
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 my-2" />
                  <div className="grid grid-cols-2 gap-2">
                    {tools.map((tool, index) => (
                      <DropdownMenuItem 
                        key={index} 
                        className="p-3 rounded-lg hover:bg-slate-50 focus:bg-slate-50 cursor-pointer"
                        onClick={() => navigate(tool.path)}
                      >
                        <div className="flex items-start">
                          <div className="mt-0.5">
                            {tool.icon}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900">{tool.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{tool.description}</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <NavLink to="/about">About</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/faq')}
              className="hidden md:flex text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 border border-slate-200 shadow-lg rounded-xl p-2" align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-slate-500">john@example.com</p>
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                  >
                    <User className="w-4 h-4 mr-2 text-slate-500" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="px-2 py-2 rounded-md text-sm cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 mr-2 text-slate-500" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem 
                    onClick={() => setIsLoggedIn(false)}
                    className="px-2 py-2 rounded-md text-sm cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200"
                >
                  Log in
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute left-0 right-0 bg-white shadow-lg border-b border-slate-200 z-40"
              >
                <div className="px-4 py-3 space-y-1">
                  <NavLink to="/" className="block px-3 py-2 text-base font-medium">
                    Home
                  </NavLink>
                  <button 
                    onClick={toggleTools}
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                  >
                    <span>Tools</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isToolsOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 py-1 space-y-1">
                          {tools.map((tool, index) => (
                            <NavLink 
                              key={index} 
                              to={tool.path} 
                              className="block px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                            >
                              <div className="flex items-center">
                                <div className="mr-2">
                                  {tool.icon}
                                </div>
                                {tool.name}
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <NavLink to="/about" className="block px-3 py-2 text-base font-medium">
                    About
                  </NavLink>
                  <NavLink to="/blog" className="block px-3 py-2 text-base font-medium">
                    Blog
                  </NavLink>
                  <NavLink to="/faq" className="block px-3 py-2 text-base font-medium">
                    Help & FAQ
                  </NavLink>
                  {!isLoggedIn && (
                    <div className="pt-2 space-y-2 border-t border-slate-100 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-center"
                        onClick={() => navigate('/login')}
                      >
                        Log in
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        onClick={() => navigate('/signup')}
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
