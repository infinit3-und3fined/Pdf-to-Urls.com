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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white text-lg font-semibold mb-4">PDF Tools</h3>
              <p className="text-slate-400 text-sm">
                Free online tools to work with PDFs. No installation or registration required.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Tools</h4>
              <ul className="space-y-2">
                {tools.slice(0, 4).map((tool) => (
                  <li key={tool.id}>
                    <RouterLink 
                      to={tool.path}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {tool.title}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} PDF Tools. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
