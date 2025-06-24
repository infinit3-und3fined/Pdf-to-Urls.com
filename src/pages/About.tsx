import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Zap, Lock, Users, Globe, Code, Shield, FileText, 
  MessageSquare, ArrowRight, ExternalLink, Check, Star, Clock, 
  ShieldCheck, BarChart2, Heart, Settings, Palette, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "PDF enthusiast with 10+ years of experience in document processing.",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Full-stack developer passionate about creating seamless user experiences.",
    social: {
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Miguel Rodriguez",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Designing intuitive interfaces that make complex tasks simple.",
    social: {
      dribbble: "#",
      behance: "#"
    }
  },
  {
    name: "Priya Patel",
    role: "Support Lead",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    bio: "Ensuring our users have the best experience with our tools.",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  }
];

const stats = [
  { 
    label: 'Active Users', 
    value: '50K+', 
    icon: Users,
    description: 'Trusted by professionals worldwide'
  },
  { 
    label: 'PDFs Processed', 
    value: '2M+', 
    icon: FileText,
    description: 'And counting every day'
  },
  { 
    label: 'Links Generated', 
    value: '10M+', 
    icon: ExternalLink,
    description: 'Seamless sharing experience'
  },
  { 
    label: 'Countries Served', 
    value: '150+', 
    icon: Globe,
    description: 'Global reach, local impact'
  }
];

const features = [
  {
    title: "Lightning Fast",
    description: "Process PDFs in seconds with our optimized engine that handles even large files with ease.",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Bank-Grade Security",
    description: "Your documents are processed securely with end-to-end encryption and automatic deletion.",
    icon: ShieldCheck,
    color: "text-green-500"
  },
  {
    title: "Intuitive Interface",
    description: "Designed for everyone - no technical skills required to get professional results.",
    icon: Palette,
    color: "text-blue-500"
  },
  {
    title: "No Watermarks",
    description: "Your documents stay exactly as you created them - no branding, no limitations.",
    icon: Star,
    color: "text-purple-500"
  },
  {
    title: "Zero Commitment",
    description: "Start using our tools immediately, no sign-up or credit card required.",
    icon: Clock,
    color: "text-pink-500"
  },
  {
    title: "Developer Ready",
    description: "Comprehensive API and documentation for seamless integration into your workflow.",
    icon: Code,
    color: "text-indigo-500"
  }
];

const values = [
  {
    title: "User-First",
    description: "We build tools that solve real problems with a focus on simplicity and effectiveness.",
    icon: <Heart className="w-6 h-6 text-red-500" />
  },
  {
    title: "Transparency",
    description: "Clear pricing, no hidden fees, and open communication with our community.",
    icon: <BarChart2 className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Innovation",
    description: "Continuously improving and expanding our toolset to meet your evolving needs.",
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="mb-6 px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full inline-flex items-center">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Trusted by 50,000+ users
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Document Tools,<br />
            <span className="text-gray-900">Simplified</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            We're on a mission to make PDFs work for you, not the other way around. Our tools are designed to be powerful yet simple, saving you time and frustration.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
              See How It Works
            </Button>
          </motion.div>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-full bg-blue-50 mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind our platform
            </p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="space-x-3">
                        {Object.entries(member.social).map(([platform, url]) => (
                          <a 
                            key={platform} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                          >
                            <span className="sr-only">{platform}</span>
                            {/* You would add platform icons here */}
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to work with PDFs, all in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-transparent">
                  <div className={`w-12 h-12 rounded-lg ${feature.color.replace('text', 'bg')} bg-opacity-10 flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your PDF workflow?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who trust our tools to handle their document needs efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 px-8 py-6 text-base font-medium"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              No credit card required • Cancel anytime • 24/7 support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
