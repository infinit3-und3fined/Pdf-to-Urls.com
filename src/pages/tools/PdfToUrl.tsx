
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, Link, QrCode, Copy, Share2, Eye, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PdfToUrl = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    shortUrl: string;
    qrCode: string;
    embedCode: string;
    isPasswordProtected: boolean;
  } | null>(null);
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const randomId = Math.random().toString(36).substr(2, 9);
      setResults({
        shortUrl: `https://pdftourls.com/view/${randomId}`,
        qrCode: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='%23000'/>`,
        embedCode: `<iframe src="https://pdftourls.com/embed/${randomId}" width="100%" height="600" frameborder="0"></iframe>`,
        isPasswordProtected: passwordProtection
      });
      setIsProcessing(false);
      toast({
        title: "Success!",
        description: "Your PDF has been processed and is ready to share.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDF to URL Generator
            </h1>
            <p className="text-xl text-gray-600">
              Upload your PDF and get a shareable link, QR code, and embed code instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload PDF</span>
                </CardTitle>
                <CardDescription>
                  Choose a PDF file to generate shareable links (max 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-700">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">PDF files up to 10MB</p>
                  </label>
                </div>

                {/* Password Protection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-protection" className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Password Protection</span>
                    </Label>
                    <Switch
                      id="password-protection"
                      checked={passwordProtection}
                      onCheckedChange={setPasswordProtection}
                    />
                  </div>
                  
                  {passwordProtection && (
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleProcess} 
                  disabled={!file || isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? "Processing..." : "Generate Links"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Your Results</span>
                </CardTitle>
                <CardDescription>
                  Share your PDF using these generated links and codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {results ? (
                  <>
                    {/* Short URL */}
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-2">
                        <Link className="w-4 h-4" />
                        <span>Short URL</span>
                      </Label>
                      <div className="flex space-x-2">
                        <Input value={results.shortUrl} readOnly />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(results.shortUrl, "Short URL")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-2">
                        <QrCode className="w-4 h-4" />
                        <span>QR Code</span>
                      </Label>
                      <div className="bg-white p-4 rounded border text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-900 rounded mb-4"></div>
                        <Button variant="outline" size="sm">
                          Download QR Code
                        </Button>
                      </div>
                    </div>

                    {/* Embed Code */}
                    <div className="space-y-2">
                      <Label>HTML Embed Code</Label>
                      <div className="flex space-x-2">
                        <Input value={results.embedCode} readOnly />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(results.embedCode, "Embed code")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-blue-700">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">0 views</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        Track views and engagement in your dashboard
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Share2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload and process a PDF to see your results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PdfToUrl;
