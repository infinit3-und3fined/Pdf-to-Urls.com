import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Loader2, 
  UploadCloud, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  QrCode, 
  Download, 
  Settings, 
  Link as LinkIcon, 
  FileText, 
  ChevronDown, 
  Circle, 
  CircleDot, 
  Square, 
  Zap, 
  Lock, 
  Smartphone,
  Shield,
  BarChart2,
  ImageIcon,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

type QrCodeStyle = 'squares' | 'dots' | 'rounded' | 'classic';

interface QrCodeColor {
  dark: string;
  light: string;
}

const DEFAULT_COLORS: QrCodeColor = {
  dark: '#000000',
  light: '#FFFFFF',
};

const PdfToQr = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [qrStyle, setQrStyle] = useState<QrCodeStyle>('squares');
  const [qrColors, setQrColors] = useState<QrCodeColor>(DEFAULT_COLORS);
  const [qrSize, setQrSize] = useState(200);
  const [qrMargin, setQrMargin] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  
  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: 'File too large',
        description: 'Please upload a PDF file smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }
    
    setFile(selectedFile);
  }, [toast]);

  // Toggle advanced options
  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(!showAdvanced);
  }, [showAdvanced]);

  // Generate QR code
  const generateQrCode = useCallback(async () => {
    if (!file) return;
    
    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random URL for demo purposes
      const randomId = Math.random().toString(36).substring(2, 10);
      const demoUrl = `https://example.com/pdf/${randomId}`;
      
      // Generate QR code URL with parameters
      const qrParams = new URLSearchParams({
        data: demoUrl,
        size: `${qrSize}x${qrSize}`,
        margin: qrMargin.toString(),
        color: qrColors.dark.replace('#', ''),
        bgcolor: qrColors.light.replace('#', ''),
        qzone: '1',
        format: 'png',
      });
      
      const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?${qrParams.toString()}`;
      
      setQrCodeUrl(qrCodeImageUrl);
      setShortUrl(demoUrl);
      
      toast({
        title: 'QR Code Generated!',
        description: 'Your QR code is ready to use.',
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate QR code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [file, qrColors.dark, qrColors.light, qrMargin, qrSize, toast]);

  // Download QR code
  const downloadQrCode = useCallback(() => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrCodeUrl]);

  // Copy QR code to clipboard
  const copyQrCode = useCallback(async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      
      toast({
        title: 'Copied!',
        description: 'QR code copied to clipboard.',
      });
    } catch (error) {
      console.error('Error copying QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy QR code. Please try again.',
        variant: 'destructive',
      });
    }
  }, [qrCodeUrl, toast]);

  // Share QR code
  const shareQrCode = useCallback(async () => {
    if (!qrCodeUrl || !navigator.share) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const file = new File([blob], 'qr-code.png', { type: 'image/png' });
      
      await navigator.share({
        title: 'My PDF QR Code',
        text: 'Check out this PDF QR code',
        files: [file],
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing QR code:', error);
      }
    }
  }, [qrCodeUrl]);

  // Handle color change
  const handleColorChange = useCallback((colorType: 'dark' | 'light', value: string) => {
    setQrColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file first.',
        variant: 'destructive',
      });
      return;
    }
    generateQrCode();
  }, [file, generateQrCode, toast]);

  // Copy text to clipboard
  const copyToClipboard = useCallback(async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: message,
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Get file name or default text
  const fileName = file ? file.name : 'No file selected';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF to QR Code</h1>
          <p className="text-xl text-gray-600">Upload your PDF and generate a QR code for easy sharing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Form */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Upload PDF</CardTitle>
                <CardDescription>Drag and drop your PDF file or click to browse</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="w-12 h-12 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF (max. 10MB)</p>
                  </div>
                </div>
                {file && (
                  <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="button"
                  onClick={generateQrCode}
                  disabled={!file || isGenerating}
                  className="w-full sm:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Advanced Options */}
            <Card className="overflow-hidden">
              <button
                type="button"
                onClick={toggleAdvanced}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Advanced Options</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdvanced ? 'transform rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-4">
                      <div>
                        <Label htmlFor="qr-style" className="block mb-2">QR Code Style</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {['squares', 'dots', 'rounded', 'classic'].map((style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() => setQrStyle(style as QrCodeStyle)}
                              className={`flex items-center justify-center p-2 rounded-md border ${
                                qrStyle === style
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <span className="capitalize">{style}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="qr-colors" className="block mb-2">Colors</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="dark-color" className="block text-sm font-medium text-gray-700 mb-1">
                              Dark Color
                            </Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="dark-color"
                                value={qrColors.dark}
                                onChange={(e) => handleColorChange('dark', e.target.value)}
                                className="w-10 h-10 p-1 rounded-md border border-gray-300 cursor-pointer"
                              />
                              <span className="text-sm text-gray-600">{qrColors.dark}</span>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="light-color" className="block text-sm font-medium text-gray-700 mb-1">
                              Light Color
                            </Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="light-color"
                                value={qrColors.light}
                                onChange={(e) => handleColorChange('light', e.target.value)}
                                className="w-10 h-10 p-1 rounded-md border border-gray-300 cursor-pointer"
                              />
                              <span className="text-sm text-gray-600">{qrColors.light}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="qr-size" className="block mb-2">
                          Size: {qrSize}px
                        </Label>
                        <Slider
                          id="qr-size"
                          min={100}
                          max={500}
                          step={10}
                          value={[qrSize]}
                          onValueChange={([value]) => setQrSize(value)}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor="qr-margin" className="block mb-2">
                          Margin: {qrMargin}px
                        </Label>
                        <Slider
                          id="qr-margin"
                          min={0}
                          max={10}
                          step={1}
                          value={[qrMargin]}
                          onValueChange={([value]) => setQrMargin(value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Lightning Fast</h3>
                </div>
                <p className="text-sm text-gray-600">Generate QR codes in seconds with our high-speed processing.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Lock className="w-5 h-5 text-green-500" />
                  <h3 className="font-medium">Secure</h3>
                </div>
                <p className="text-sm text-gray-600">Your files are processed securely and never stored permanently.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Smartphone className="w-5 h-5 text-purple-500" />
                  <h3 className="font-medium">Mobile Friendly</h3>
                </div>
                <p className="text-sm text-gray-600">Works perfectly on all devices, from desktop to mobile.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  <h3 className="font-medium">No Registration</h3>
                </div>
                <p className="text-sm text-gray-600">Start generating QR codes instantly without signing up.</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
                <CardDescription>Scan this code to access your PDF</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-8">
                {qrCodeUrl ? (
                  <div className="flex flex-col items-center space-y-6">
                    <div 
                      ref={qrCodeRef}
                      className="p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <img
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                    
                    <div className="w-full max-w-md">
                      <Label htmlFor="short-url" className="sr-only">Short URL</Label>
                      <div className="flex rounded-md shadow-sm">
                        <div className="relative flex flex-grow items-stretch focus-within:z-10">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <LinkIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="short-url"
                            readOnly
                            value={shortUrl}
                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                            placeholder="Generating URL..."
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(shortUrl, 'URL copied to clipboard!')}
                          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <Copy className="h-4 w-4 text-gray-400" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={downloadQrCode}
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={copyQrCode}
                        className="flex items-center space-x-2"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy Image</span>
                      </Button>
                      
                      {navigator.share && (
                        <Button
                          variant="outline"
                          onClick={shareQrCode}
                          className="flex items-center space-x-2"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                      <QrCode className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No QR Code Generated</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Upload a PDF and click "Generate QR Code" to create your QR code.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                    <span className="font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Upload Your PDF</h4>
                    <p className="text-sm text-gray-600">Drag and drop your PDF file or click to browse your device.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                    <span className="font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Generate QR Code</h4>
                    <p className="text-sm text-gray-600">Click the "Generate QR Code" button to create your unique QR code.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                    <span className="font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Download & Share</h4>
                    <p className="text-sm text-gray-600">Download, copy, or share your QR code with others.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <BarChart2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">10,000+</p>
                <p className="text-sm text-gray-600">QR Codes Generated</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <UserPlus className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">5,000+</p>
                <p className="text-sm text-gray-600">Happy Users</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">Is there a file size limit for PDF uploads?</h3>
              <p className="mt-2 text-gray-600">
                Yes, the maximum file size for PDF uploads is 10MB. If your file is larger, please compress it before uploading.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">How long are the QR codes active?</h3>
              <p className="mt-2 text-gray-600">
                The QR codes generated are permanent and will not expire. However, the link will only work as long as our service is active.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">Is my data secure?</h3>
              <p className="mt-2 text-gray-600">
                Yes, we take your privacy seriously. Your PDF files are processed securely and never stored permanently on our servers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">Can I customize the QR code appearance?</h3>
              <p className="mt-2 text-gray-600">
                Yes, you can customize the QR code colors, size, and margin using the advanced options. You can also choose from different styles like squares, dots, rounded, or classic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfToQr;
