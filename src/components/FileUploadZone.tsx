
import { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Check, Copy, QrCode, Share, ExternalLink, Shield, Eye, Download, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUploadZone = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [shareData, setShareData] = useState<{
    shortUrl: string;
    embedCode: string;
    qrCodeUrl: string;
    extractedUrls: string[];
    viewCount: number;
  } | null>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        if (droppedFile.size > 10 * 1024 * 1024) { // 10MB limit
          toast({
            title: "File too large",
            description: "Please upload a PDF file smaller than 10MB.",
            variant: "destructive",
          });
          return;
        }
        setFile(droppedFile);
        handleUpload(droppedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
          toast({
            title: "File too large",
            description: "Please upload a PDF file smaller than 10MB.",
            variant: "destructive",
          });
          return;
        }
        setFile(selectedFile);
        handleUpload(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async (uploadFile: File) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call with URL extraction
    setTimeout(() => {
      setUploadProgress(100);
      setUploading(false);
      setUploadComplete(true);
      
      const fileId = Math.random().toString(36).substr(2, 9);
      setShareData({
        shortUrl: `https://pdftourls.com/view/${fileId}`,
        embedCode: `<iframe src="https://pdftourls.com/embed/${fileId}" width="100%" height="600" frameborder="0"></iframe>`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://pdftourls.com/view/${fileId}`,
        extractedUrls: [
          'https://example.com/contact',
          'https://github.com/sample-repo',
          'https://docs.google.com/document/d/sample',
          'mailto:contact@example.com',
          'https://linkedin.com/in/profile'
        ],
        viewCount: 0
      });

      toast({
        title: "Upload successful!",
        description: "Your PDF has been processed and URLs extracted.",
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

  const downloadQR = () => {
    if (shareData?.qrCodeUrl) {
      const link = document.createElement('a');
      link.href = shareData.qrCodeUrl;
      link.download = 'qr-code.png';
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "QR code saved to your device.",
      });
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploading(false);
    setUploadProgress(0);
    setUploadComplete(false);
    setShareData(null);
  };

  if (uploadComplete && shareData) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Success Header */}
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">Upload Successful!</h3>
              <p className="text-green-600">{file?.name} processed • {shareData.extractedUrls.length} URLs found</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-700">
              <Eye className="w-4 h-4" />
              <span>{shareData.viewCount} views</span>
            </div>
          </div>
        </Card>

        {/* URL Extraction Results */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Link className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Extracted URLs</h3>
              <Badge variant="secondary">{shareData.extractedUrls.length} found</Badge>
            </div>
          </div>
          
          {shareData.extractedUrls.length > 0 ? (
            <div className="space-y-3">
              {shareData.extractedUrls.map((url, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <code className="text-sm flex-1 truncate font-mono">{url}</code>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(url, "URL")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => window.open(url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Link className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No clickable URLs found in this PDF</p>
            </div>
          )}
        </Card>

        {/* Share Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Short URL */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Share className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Short URL</h3>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <code className="text-sm break-all font-mono">{shareData.shortUrl}</code>
            </div>
            <div className="space-y-2">
              <Button 
                onClick={() => copyToClipboard(shareData.shortUrl, "Short URL")}
                className="w-full"
                variant="outline"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Short Link
              </Button>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Shield className="w-4 h-4 mr-1" />
                  Add Password
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          </Card>

          {/* QR Code */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">QR Code</h3>
            </div>
            <div className="text-center mb-4">
              <img 
                src={shareData.qrCodeUrl} 
                alt="QR Code" 
                className="mx-auto border rounded-lg shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Button 
                onClick={downloadQR}
                className="w-full"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button 
                onClick={() => copyToClipboard(shareData.qrCodeUrl, "QR code URL")}
                className="w-full"
                variant="ghost"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy QR URL
              </Button>
            </div>
          </Card>
        </div>

        {/* Embed Code */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ExternalLink className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold">HTML Embed Code</h3>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <code className="text-sm break-all font-mono">{shareData.embedCode}</code>
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={() => copyToClipboard(shareData.embedCode, "Embed code")}
              variant="outline"
              className="flex-1"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Embed Code
            </Button>
            <Button variant="ghost" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Preview Embed
            </Button>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
          <Button onClick={resetUpload} variant="outline" className="sm:flex-1 max-w-xs">
            Upload Another PDF
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 sm:flex-1 max-w-xs">
            Create Free Account to Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      {uploading ? (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Processing your PDF...</h3>
          <p className="text-gray-600 mb-6">Extracting URLs and generating share links</p>
          <Progress value={uploadProgress} className="mb-4" />
          <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
        </div>
      ) : (
        <div
          className={`p-8 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Upload your PDF</h3>
            <p className="text-gray-600 mb-6">
              Drag and drop your PDF file here, or click to browse
            </p>
            
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <FileText className="w-5 h-5 mr-2" />
              Choose PDF File
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Maximum file size: 10MB for free users • Supported format: PDF
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FileUploadZone;
