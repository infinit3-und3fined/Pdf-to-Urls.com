
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import About from "./pages/About";

// Tool Pages
import PdfToUrl from "./pages/tools/PdfToUrl";
import ExtractUrls from "./pages/tools/ExtractUrls";
import ExtractImages from "./pages/tools/ExtractImages";
import PdfToQr from "./pages/tools/PdfToQr";
import MergePdf from "./pages/tools/MergePdf";
import SplitPdf from "./pages/tools/SplitPdf";
import CompressPdf from "./pages/tools/CompressPdf";
import ExtractText from "./pages/tools/ExtractText";
import SecureViewer from "./pages/tools/SecureViewer";
import PdfToHtml from "./pages/tools/PdfToHtml";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          
          {/* Tool Routes */}
          <Route path="/pdf-to-url" element={<PdfToUrl />} />
          <Route path="/extract-urls-from-pdf" element={<ExtractUrls />} />
          <Route path="/extract-images-from-pdf" element={<ExtractImages />} />
          <Route path="/pdf-to-qr" element={<PdfToQr />} />
          <Route path="/merge-pdf-files" element={<MergePdf />} />
          <Route path="/split-pdf-pages" element={<SplitPdf />} />
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/extract-text-from-pdf" element={<ExtractText />} />
          <Route path="/secure-pdf-viewer" element={<SecureViewer />} />
          <Route path="/pdf-to-html" element={<PdfToHtml />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
