
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ExternalLink, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExtractUrls = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate URL extraction
    setTimeout(() => {
      const mockUrls = [
        "https://example.com/page1",
        "https://github.com/user/repo",
        "https://docs.google.com/document/123",
        "mailto:contact@example.com",
        "https://wikipedia.org/article",
        "https://stackoverflow.com/questions/123"
      ];
      setExtractedUrls(mockUrls);
      setIsProcessing(false);
      toast({
        title: "URLs Extracted!",
        description: `Found ${mockUrls.length} URLs in your PDF.`,
      });
    }, 1500);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard.",
    });
  };

  const exportUrls = () => {
    const content = extractedUrls.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-urls.txt';
    a.click();
  };

  return (
    <div className="min-h-screen">
      <main className="py-12 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Extract URLs from PDF
            </h1>
            <p className="text-xl text-gray-600">
              Upload your PDF and automatically extract all clickable URLs
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
                  Choose a PDF file to extract all URLs from
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
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
                      {file ? file.name : "Click to upload PDF file"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">PDF files up to 10MB</p>
                  </label>
                </div>

                <Button 
                  onClick={handleExtract} 
                  disabled={!file || isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isProcessing ? "Extracting URLs..." : "Extract URLs"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>Extracted URLs</span>
                  </div>
                  {extractedUrls.length > 0 && (
                    <Badge variant="secondary">{extractedUrls.length} URLs</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  All clickable URLs found in your PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                {extractedUrls.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={exportUrls} className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export as TXT
                      </Button>
                    </div>
                    
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {extractedUrls.map((url, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-blue-600 font-mono truncate flex-1 mr-2">
                            {url}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyUrl(url)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ExternalLink className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a PDF to extract URLs</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExtractUrls;
