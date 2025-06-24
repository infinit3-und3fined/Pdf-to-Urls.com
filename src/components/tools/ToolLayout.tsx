import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, icon: Icon, color, children }: ToolLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${color} mb-6 shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}
