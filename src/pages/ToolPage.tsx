
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Upload, Share, QrCode, Link as LinkIcon, Shield, Eye, FileText, Zap, 
  Star, ExternalLink, Copy, Download, CheckCircle, ArrowRight, Image, 
  FileSearch, Scissors, Combine, Shrink, Code2, FileInput, FileOutput,
  Layers, BarChart2, Lock, Edit3, Award, CheckCircle2, Info, Loader2, Menu, X
} from "lucide-react";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import FileUploadZone from "@/components/FileUploadZone";
import { cn } from "@/lib/utils";

// Tool configuration mapping
type ToolConfig = {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
};

const toolConfigs: Record<string, ToolConfig> = {
  'pdf-to-url': {
    title: 'PDF to URL',
    description: 'Convert your PDFs into shareable links with our easy-to-use tool',
    icon: <LinkIcon className="w-5 h-5" />,
    gradient: 'from-blue-600 to-purple-600',
  },
  'extract-urls': {
    title: 'Extract URLs',
    description: 'Extract all clickable links from your PDF documents',
    icon: <LinkIcon className="w-5 h-5" />,
    gradient: 'from-green-600 to-teal-500',
  },
  'extract-text': {
    title: 'Extract Text',
    description: 'Extract and edit text content from your PDF files',
    icon: <FileText className="w-5 h-5" />,
    gradient: 'from-amber-500 to-orange-500',
  },
  'extract-images': {
    title: 'Extract Images',
    description: 'Extract all images from your PDF documents',
    icon: <Image className="w-5 h-5" />,
    gradient: 'from-pink-500 to-rose-500',
  },
  'pdf-to-html': {
    title: 'PDF to HTML',
    description: 'Convert PDF files to responsive HTML web pages',
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'from-indigo-600 to-blue-500',
  },
  'pdf-to-qr': {
    title: 'PDF to QR Code',
    description: 'Generate QR codes that link to your PDF files',
    icon: <QrCode className="w-5 h-5" />,
    gradient: 'from-purple-600 to-pink-500',
  },
  'merge-pdf': {
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document',
    icon: <Combine className="w-5 h-5" />,
    gradient: 'from-emerald-500 to-teal-600',
  },
  'split-pdf': {
    title: 'Split PDF',
    description: 'Split PDF documents into multiple files',
    icon: <Scissors className="w-5 h-5" />,
    gradient: 'from-rose-500 to-pink-600',
  },
  'compress-pdf': {
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    icon: <Shrink className="w-5 h-5" />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  'secure-viewer': {
    title: 'Secure PDF Viewer',
    description: 'View PDFs securely with password protection',
    icon: <Shield className="w-5 h-5" />,
    gradient: 'from-amber-500 to-orange-500',
  },
};

const NavLink = ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <RouterLink 
      to={to}
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100',
        className
      )}
    >
      {children}
    </RouterLink>
  );
};

const ToolPage = () => {
  const { toolId = 'pdf-to-url' } = useParams<{ toolId?: string }>();
  const tool = toolConfigs[toolId] || toolConfigs['pdf-to-url'];
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Dynamic steps based on tool type
  const getToolSteps = () => {
    const baseSteps = [
      {
        title: "Upload Your PDF",
        description: "Drag and drop your PDF file or click to browse. Files up to 10MB are supported.",
        icon: Upload
      }
    ];

    const actionStep = {
      'pdf-to-url': {
        title: "Generate Shareable Link",
        description: "Instantly create a secure, shareable link to your PDF document.",
        icon: LinkIcon
      },
      'extract-urls': {
        title: "Extract URLs Automatically",
        description: "Our AI scans your PDF and extracts all clickable URLs and links.",
        icon: LinkIcon
      },
      'extract-text': {
        title: "Extract Text Content",
        description: "Get all text content from your PDF in an editable format.",
        icon: FileText
      },
      'extract-images': {
        title: "Extract All Images",
        description: "Download all images from your PDF in high quality.",
        icon: Image
      },
      'pdf-to-html': {
        title: "Convert to HTML",
        description: "Transform your PDF into a responsive HTML document.",
        icon: Code2
      },
      'pdf-to-qr': {
        title: "Generate QR Code",
        description: "Create a QR code that links directly to your PDF.",
        icon: QrCode
      },
      'merge-pdf': {
        title: "Combine PDFs",
        description: "Merge multiple PDFs into a single document.",
        icon: Combine
      },
      'split-pdf': {
        title: "Split PDF",
        description: "Divide your PDF into multiple files by pages or sections.",
        icon: Scissors
      },
      'compress-pdf': {
        title: "Compress PDF",
        description: "Reduce file size while maintaining quality.",
        icon: Shrink
      },
      'secure-viewer': {
        title: "Secure Your PDF",
        description: "Add password protection and access controls.",
        icon: Shield
      }
    }[toolId] || {
      title: "Process Your PDF",
      description: "Apply the selected tool to your document.",
      icon: FileText
    };

    const resultStep = {
      title: "Get Your Results",
      description: "Download, share, or save your processed document.",
      icon: Download
    };

    return [...baseSteps, actionStep, resultStep];
  };

  const steps = getToolSteps();

  // Get tool-specific FAQs
  const getToolFaqs = () => {
    const commonFaqs = [
      {
        question: `What file size limit is there for PDF uploads?`,
        answer: `Free users can upload PDF files up to 10MB in size. This covers most documents including research papers, reports, presentations, and manuals. Premium users get higher limits and additional features.`
      },
      {
        question: `Is my data secure when using this tool?`,
        answer: `Yes, we take your privacy and security seriously. Your files are processed securely and automatically deleted from our servers after processing. We don't store your documents longer than necessary.`
      },
      {
        question: `Do I need to create an account to use this tool?`,
        answer: `No, you can use our basic features without creating an account. However, creating a free account gives you access to additional features like saving your processing history and higher file size limits.`
      }
    ];

    const toolSpecificFaqs = {
      'pdf-to-url': [
        {
          question: "How do I create a shareable link for my PDF?",
          answer: "Simply upload your PDF using our tool, and we'll generate a unique, secure link that you can share with anyone. The link will open your PDF in our online viewer."
        },
        {
          question: "Can I set an expiration date for the link?",
          answer: "Yes, with a premium account, you can set expiration dates for your shared links, add password protection, and track views."
        }
      ],
      'extract-urls': [
        {
          question: "How do I extract URLs from a PDF file?",
          answer: "Upload your PDF, and our system will automatically scan and extract all clickable URLs and text that looks like web addresses. You'll get a clean list of all found links."
        },
        {
          question: "What formats can I export the extracted URLs to?",
          answer: "You can copy the URLs to your clipboard, download them as a CSV file for spreadsheets, or export as a TXT file."
        }
      ],
      'extract-text': [
        {
          question: "How accurate is the text extraction?",
          answer: "Our text extraction is highly accurate for most PDFs. The accuracy depends on the quality of the PDF and how the text is embedded in the document."
        },
        {
          question: "Can I edit the extracted text?",
          answer: "Yes, after extraction, you can edit the text directly in your browser before downloading or copying it."
        }
      ],
      'extract-images': [
        {
          question: "What image formats will I get?",
          answer: "Images are extracted in their original format (usually JPG, PNG, or TIFF) and can be downloaded individually or as a ZIP archive."
        },
        {
          question: "Is there a limit to the number of images I can extract?",
          answer: "No, you can extract all images from your PDF, regardless of quantity."
        }
      ],
      'pdf-to-html': [
        {
          question: "How well does the PDF to HTML conversion work?",
          answer: "Our converter preserves the layout and formatting of your PDF as much as possible, creating clean HTML that works across devices."
        },
        {
          question: "Can I edit the HTML after conversion?",
          answer: "Yes, you can edit the HTML directly in our editor or download it to make further changes in your preferred HTML editor."
        }
      ],
      'pdf-to-qr': [
        {
          question: "How do I generate a QR code for my PDF?",
          answer: "Upload your PDF, and we'll create a QR code that links directly to your document. You can download the QR code as a PNG or SVG file."
        },
        {
          question: "Can I customize the QR code design?",
          answer: "Yes, with a premium account, you can customize the colors and add a logo to your QR code."
        }
      ],
      'merge-pdf': [
        {
          question: "How many PDFs can I merge at once?",
          answer: "Free users can merge up to 5 PDFs at once. Premium users can merge up to 50 files in a single operation."
        },
        {
          question: "Can I reorder pages before merging?",
          answer: "Yes, you can drag and drop pages to reorder them before finalizing the merge."
        }
      ],
      'split-pdf': [
        {
          question: "How do I split a PDF?",
          answer: "Upload your PDF and choose whether to split by page ranges, extract specific pages, or split at every page."
        },
        {
          question: "Can I split a PDF by bookmarks?",
          answer: "Yes, our premium version allows you to split PDFs based on existing bookmarks."
        }
      ],
      'compress-pdf': [
        {
          question: "How much can I compress a PDF?",
          answer: "Compression rates vary, but you can typically reduce file size by 50-90% while maintaining good quality."
        },
        {
          question: "Will compression reduce the quality of my PDF?",
          answer: "There's a trade-off between file size and quality. Our tool lets you choose the compression level to find the right balance for your needs."
        }
      ],
      'secure-viewer': [
        {
          question: "How do I password-protect my PDF?",
          answer: "Upload your PDF, set a password, and we'll create a secure version that requires the password to open."
        },
        {
          question: "Can I restrict printing or copying text?",
          answer: "Yes, with our premium version, you can set various permissions like preventing printing, copying text, or modifying the document."
        }
      ]
    }[toolId] || [
      {
        question: `How do I use the ${tool.title} tool?`,
        answer: `Simply upload your PDF file, and our tool will process it according to your needs. The interface will guide you through any additional options specific to this tool.`
      },
      {
        question: `What are the benefits of ${tool.title}?`,
        answer: `This tool helps you ${tool.description.toLowerCase()}. It's fast, secure, and easy to use, with no software installation required.`
      }
    ];

    return [...commonFaqs, ...toolSpecificFaqs];
  };

  const faqs = getToolFaqs();

  // Get tooltip content for benefits
  const getTooltipContent = (benefit: string) => {
    if (benefit.includes('secure')) return 'Your files are processed securely and never stored permanently';
    if (benefit.includes('track')) return 'Monitor how your documents are being accessed and shared';
    if (benefit.includes('password')) return 'Add an extra layer of security to your documents';
    return 'Learn more about this feature';
  };

  // Get tool-specific benefits
  const getToolBenefits = () => {
    const commonBenefits = [
      "No software installation required",
      "100% secure and private processing",
      "Works on all devices and platforms"
    ];

    const toolSpecificBenefits = {
      'pdf-to-url': [
        "Create shareable links in seconds",
        "Track views and engagement",
        "Set password protection and expiration dates"
      ],
      'extract-urls': [
        "Extract all URLs with a single click",
        "Export to CSV, TXT, or copy to clipboard",
        "Process multiple PDFs in batch"
      ],
      'extract-text': [
        "Preserve text formatting and structure",
        "Extract text from scanned documents (OCR)",
        "Edit text before downloading"
      ],
      'extract-images': [
        "Download all images in original quality",
        "Extract images from any PDF page",
        "Batch download as ZIP archive"
      ],
      'pdf-to-html': [
        "Convert PDFs to responsive HTML",
        "Preserve layout and formatting",
        "Edit HTML directly in your browser"
      ],
      'pdf-to-qr': [
        "Generate QR codes in seconds",
        "Customize colors and add logos",
        "Download in PNG or SVG format"
      ],
      'merge-pdf': [
        "Combine multiple PDFs into one",
        "Drag and drop to reorder pages",
        "Merge up to 50 files at once"
      ],
      'split-pdf': [
        "Split by page ranges or extract pages",
        "Split by bookmarks (premium)",
        "Download individual pages or ranges"
      ],
      'compress-pdf': [
        "Reduce file size without losing quality",
        "Adjust compression level as needed",
        "Preview before downloading"
      ],
      'secure-viewer': [
        "Add password protection",
        "Restrict printing and copying",
        "Set document permissions"
      ]
    }[toolId] || [
      `Quick and easy ${tool.title.toLowerCase()}`,
      `Process documents in seconds`,
      `No watermarks or usage limits`
    ];

    return [...commonBenefits, ...toolSpecificBenefits];
  };

  const benefits = getToolBenefits();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" role="main" aria-label={`${tool.title} Tool`}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tool.gradient} bg-clip-padding`}>
                  {tool.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to Home</p>
              </TooltipContent>
            </Tooltip>
            <RouterLink 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              aria-label="PDF Tools Home"
            >
              PDF Tools
            </RouterLink>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/tools">Tools</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <RouterLink to="/login">Login</RouterLink>
            </Button>
            <Button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <RouterLink to="/signup">Sign Up Free</RouterLink>
            </Button>
            
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <div className="flex items-center space-x-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tool.gradient} bg-clip-padding`}>
                        {tool.icon}
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        PDF Tools
                      </span>
                    </div>
                  </div>
                  <nav className="flex-1 p-6 space-y-2">
                    <NavLink to="/" className="flex items-center">
                      Home
                    </NavLink>
                    <NavLink to="/features" className="flex items-center">
                      Features
                    </NavLink>
                    <NavLink to="/tools" className="flex items-center">
                      Tools
                    </NavLink>
                    <NavLink to="/about" className="flex items-center">
                      About
                    </NavLink>
                  </nav>
                  <div className="p-6 border-t space-y-4">
                    <Button className="w-full" asChild>
                      <RouterLink to="/login">Log In</RouterLink>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <RouterLink to="/signup">Sign Up</RouterLink>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <RouterLink to="/" className="hover:text-blue-600">Home</RouterLink>
          <span className="mx-2">/</span>
          <RouterLink to="/tool/pdf-link-extractor" className="text-blue-600">{tool.title}</RouterLink>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center">
            <Badge 
              variant="outline" 
              className={`mb-4 bg-opacity-10 ${tool.gradient.replace('from-', 'bg-').replace(' to-', '/')} text-${tool.gradient.split(' ')[0].replace('from-', '')}-600 border-${tool.gradient.split(' ')[0].replace('from-', '')}-200 hover:bg-opacity-20 transition-colors`}
            >
              <Zap className="w-4 h-4 mr-2" />
              {tool.title}
            </Badge>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6 ml-2 text-gray-400 hover:text-gray-600">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.description}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {tool.title}
            <span className={`block bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent`}>
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {tool.description} with our easy-to-use online tool. Fast, secure, and free to use.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  className={`bg-gradient-to-r ${tool.gradient} text-white hover:opacity-90 transition-opacity`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Try {tool.title} Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to upload a PDF file</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    // Example demo action
                    toast({
                      title: "Demo Mode",
                      description: "This is a demo action. In a real scenario, this would show a demonstration of the tool.",
                    });
                  }}
                >
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Watch Demo
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See how it works with a sample file</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Tool Interface */}
        <div className="max-w-4xl mx-auto mb-16 px-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className={`bg-gradient-to-r ${tool.gradient} p-6`}>
              <CardTitle className="text-white text-2xl">{tool.title}</CardTitle>
              <CardDescription className="text-white/90">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your PDF file</h3>
                <p className="text-sm text-gray-500 mb-4">Drag and drop your file here, or click to browse (max 10MB)</p>
                <Button 
                  variant="outline" 
                  className="border-2 border-gray-300 bg-white hover:bg-gray-50"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select PDF File
                </Button>
                <input id="file-upload" type="file" className="hidden" accept=".pdf" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Our {tool.title} Tool?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              // Choose an icon based on the benefit content
              const getBenefitIcon = () => {
                if (benefit.toLowerCase().includes('secure') || benefit.toLowerCase().includes('privacy')) {
                  return <Shield className="w-6 h-6 text-blue-600" />;
                } else if (benefit.toLowerCase().includes('fast') || benefit.toLowerCase().includes('quick')) {
                  return <Zap className="w-6 h-6 text-yellow-500" />;
                } else if (benefit.toLowerCase().includes('export') || benefit.toLowerCase().includes('download')) {
                  return <Download className="w-6 h-6 text-green-600" />;
                } else if (benefit.toLowerCase().includes('edit') || benefit.toLowerCase().includes('customize')) {
                  return <Edit3 className="w-6 h-6 text-purple-600" />;
                } else if (benefit.toLowerCase().includes('quality') || benefit.toLowerCase().includes('high')) {
                  return <Award className="w-6 h-6 text-amber-500" />;
                } else if (benefit.toLowerCase().includes('batch') || benefit.toLowerCase().includes('multiple')) {
                  return <Layers className="w-6 h-6 text-indigo-600" />;
                } else if (benefit.toLowerCase().includes('track') || benefit.toLowerCase().includes('analytics')) {
                  return <BarChart2 className="w-6 h-6 text-teal-500" />;
                } else if (benefit.toLowerCase().includes('password') || benefit.toLowerCase().includes('secure')) {
                  return <Lock className="w-6 h-6 text-red-500" />;
                } else {
                  return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
                }
              };

              return (
                <div 
                  key={index} 
                  className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-100 h-full flex flex-col"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                    {getBenefitIcon()}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How to Use {tool.title}
            </h2>
            <p className="text-xl text-gray-600">Simple {steps.length}-step process to {tool.title.toLowerCase()}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className={`font-bold bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent`}>
                      {index + 1}
                    </span>
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
      </div>
    </TooltipProvider>
  );
};

// Add error boundary for better error handling
const ToolPageWithErrorBoundary: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error caught by error boundary:', error);
      setHasError(true);
      toast({
        title: "Something went wrong",
        description: "We're working on fixing this issue. Please try again later.",
        variant: "destructive",
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [toast]);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-6">We're having trouble loading this page. Please try refreshing.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return <ToolPage />;
};

export default ToolPageWithErrorBoundary;
