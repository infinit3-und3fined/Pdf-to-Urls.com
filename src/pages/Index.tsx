import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  FileText, 
  Image as ImageIcon, 
  FileCheck, 
  FileSearch, 
  FileLock, 
  FileCode,
  ArrowRight,
  FileSignature,
  Shield
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import FileUploadZone from '@/components/FileUploadZone';
import { useToast } from "@/components/ui/use-toast";
import { motion, Variants } from 'framer-motion';

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  })
};

// Types
interface Tool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  path: string;
  color: string;
  category: string;
  id: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

// Tool Categories
const categories: Category[] = [
  { id: 'all', name: 'All Tools', icon: <FileText className="w-4 h-4" /> },
  { id: 'extract', name: 'Extract', icon: <FileSearch className="w-4 h-4" /> },
  { id: 'convert', name: 'Convert', icon: <FileCode className="w-4 h-4" /> },
  { id: 'secure', name: 'Security', icon: <FileLock className="w-4 h-4" /> },
];

// Tools Data
const tools: Tool[] = [
  {
    icon: FileText,
    title: 'Extract Text from PDF',
    description: 'Extract text content from any PDF document with high accuracy.',
    path: '/extract-text-from-pdf',
    color: 'bg-blue-600',
    category: 'extract',
    id: 'extract-text-from-pdf'
  },
  {
    icon: ImageIcon,
    title: 'Extract Images from PDF',
    description: 'Save images from PDF files in their original quality.',
    path: '/extract-images-from-pdf',
    color: 'bg-green-600',
    category: 'extract',
    id: 'extract-images-from-pdf'
  },
  {
    icon: FileCheck,
    title: 'Merge PDFs',
    description: 'Combine multiple PDFs into a single document.',
    path: '/merge-pdfs',
    color: 'bg-purple-600',
    category: 'convert',
    id: 'merge-pdfs'
  },
  {
    icon: FileSearch,
    title: 'Split PDF',
    description: 'Divide a PDF into multiple separate files.',
    path: '/split-pdf',
    color: 'bg-amber-600',
    category: 'convert',
    id: 'split-pdf'
  },
  {
    icon: FileLock,
    title: 'Secure PDF',
    description: 'Add password protection to your PDF files.',
    path: '/secure-pdf',
    color: 'bg-red-600',
    category: 'secure',
    id: 'secure-pdf'
  },
  {
    icon: FileSignature,
    title: 'Sign PDF',
    description: 'Add your signature to PDF documents.',
    path: '/sign-pdf',
    color: 'bg-indigo-600',
    category: 'convert',
    id: 'sign-pdf'
  }
];

// FAQ Data
const faqs: FAQItem[] = [
  {
    question: 'Is it free to use?',
    answer: 'Yes, all our basic PDF tools are completely free to use with no hidden charges.',
    icon: <FileText className="w-5 h-5 text-blue-600" />
  },
  {
    question: 'Are my files secure?',
    answer: 'Your files are processed securely in your browser and are never stored on our servers.',
    icon: <Shield className="w-5 h-5 text-green-600" />
  },
  {
    question: 'What file types do you support?',
    answer: 'We support all standard PDF files. Some tools may have additional format support.',
    icon: <FileCheck className="w-5 h-5 text-purple-600" />
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const filteredTools = activeTab === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeTab);

  const handleFileUpload = (file: File) => {
    toast({
      title: 'File uploaded',
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PDF Tools
                </span>{' '}
                Made Simple
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Free online tools to work with PDFs. No installation or registration required.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="px-6 py-5 text-base font-medium bg-blue-600 hover:bg-blue-700 shadow hover:shadow-md transition-all"
                  onClick={() => scrollToSection('tools')}
                >
                  Start for Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-6 py-5 text-base border-slate-200 hover:bg-slate-50 text-slate-700"
                  onClick={() => scrollToSection('tools')}
                >
                  Explore Tools
                </Button>
              </div>
              <div className="mt-12 max-w-2xl mx-auto">
                <Card className="border border-slate-100 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold text-slate-800">Upload Your PDF</CardTitle>
                    <CardDescription className="text-slate-500">
                      Drag & drop your file here or click to browse
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploadZone onFileSelected={handleFileUpload} />
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
            >
              Essential PDF Tools
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-slate-600 max-w-2xl mx-auto"
            >
              All the tools you need to work with PDFs efficiently.
            </motion.p>
          </div>

          {/* Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeTab === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(category.id)}
                className={`rounded-full transition-colors ${
                  activeTab === category.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Tools Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={fadeIn}
                custom={index * 0.1}
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-md border border-slate-100 hover:border-blue-100">
                  <RouterLink to={tool.path} className="block h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                          <tool.icon className="w-5 h-5" />
                        </div>
                        <CardTitle className="ml-3 text-lg font-semibold text-slate-800">
                          {tool.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-slate-600 text-sm">{tool.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        Use Tool
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </CardFooter>
                  </RouterLink>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-slate-600 max-w-2xl mx-auto"
            >
              Find answers to common questions about our PDF tools.
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={index * 0.1}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        {faq.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-slate-900">
                          {faq.question}
                        </CardTitle>
                        <CardDescription className="mt-1 text-slate-600">
                          {faq.answer}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
