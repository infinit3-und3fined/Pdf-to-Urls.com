
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, QrCode, Copy, Eye, Lock, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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

  const resetForm = () => {
    setFile(null);
    setResults(null);
    setPassword('');
    setPasswordProtection(false);
  };

  return (
    <ToolLayout
      title="PDF to URL Generator"
      description="Upload your PDF and get a shareable link, QR code, and embed code"
      icon={LinkIcon}
      color="from-blue-500 to-indigo-600"
    >
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload PDF
          </TabsTrigger>
          <TabsTrigger 
            value="link" 
            className="flex items-center gap-2" 
            disabled={!results}
          >
            <LinkIcon className="w-4 h-4" />
            Share Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdf-upload" className="text-base">PDF File</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <Upload className="w-10 h-10 mb-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <p className="mb-2 text-sm text-slate-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-400">PDF (max. 10MB)</p>
                      {file && (
                        <p className="mt-4 text-sm font-medium text-slate-800">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                    <input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-protection">Password Protection</Label>
                    <p className="text-sm text-slate-500">Secure your PDF with a password</p>
                  </div>
                  <Switch
                    id="password-protection"
                    checked={passwordProtection}
                    onCheckedChange={setPasswordProtection}
                  />
                </div>

                {passwordProtection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a strong password"
                        className="mt-1"
                      />
                      <p className="mt-1 text-xs text-slate-500">
                        This password will be required to view the PDF
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleProcess}
              disabled={!file || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate Shareable Link
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="link" className="p-6">
          {results && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Your PDF is Ready to Share!</h3>
                <p className="text-slate-500">Use the options below to share your PDF</p>
              </div>

              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Shareable Link</CardTitle>
                    <div className="flex items-center space-x-2">
                      {results.isPasswordProtected && (
                        <Badge variant="secondary" className="flex items-center">
                          <Lock className="w-3 h-3 mr-1" />
                          Protected
                        </Badge>
                      )}
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Short URL</Label>
                      <div className="flex">
                        <div className="flex-1 bg-slate-50 rounded-l-lg p-3 border border-slate-200 border-r-0 text-sm truncate font-mono">
                          {results.shortUrl}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-l-none border-l-0"
                          onClick={() => copyToClipboard(results.shortUrl, 'URL')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">QR Code</Label>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-slate-200 inline-block">
                            <img src={results.qrCode} alt="QR Code" className="w-40 h-40" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = results.qrCode;
                                link.download = 'pdf-qrcode.png';
                                link.click();
                              }}
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Embed Code</Label>
                        <div className="relative">
                          <pre className="bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-x-auto text-sm font-mono h-40">
                            {results.embedCode}
                          </pre>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(results.embedCode, 'Embed code')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          Add this code to your website to embed the PDF viewer
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 px-6 py-4 border-t flex justify-between">
                  <Button variant="outline" onClick={() => {
                    setFile(null);
                    setResults(null);
                    setPassword('');
                    setPasswordProtection(false);
                  }}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Another PDF
                  </Button>
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Eye className="w-4 h-4" />
                    <span>This link will expire in 30 days</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default PdfToUrl;
