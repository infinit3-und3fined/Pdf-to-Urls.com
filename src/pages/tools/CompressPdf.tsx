import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Loader2, FileDown, FileUp, FileCheck, Zap } from "lucide-react";

type CompressionLevel = 'low' | 'medium' | 'high' | 'recommended' | 'custom';

const COMPRESSION_LEVELS: Record<CompressionLevel, { label: string; description: string; value: number }> = {
  low: { label: 'Low (Minimum compression)', description: 'Best quality, larger file size', value: 1 },
  medium: { label: 'Medium (Balanced)', description: 'Good balance of quality and size', value: 2 },
  recommended: { label: 'Recommended', description: 'Optimal balance for most documents', value: 3 },
  high: { label: 'High (Maximum compression)', description: 'Smaller file size, lower quality', value: 4 },
  custom: { label: 'Custom', description: 'Set your own compression level', value: 5 },
};

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('recommended');
  const [customQuality, setCustomQuality] = useState(75);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      setOriginalSize(newFile.size);
      setCompressedSize(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateCompressedSize = (): string => {
    if (!originalSize) return '--';
    
    let ratio = 0.5; // Default for recommended
    
    switch (compressionLevel) {
      case 'low': ratio = 0.9; break;
      case 'medium': ratio = 0.7; break;
      case 'recommended': ratio = 0.5; break;
      case 'high': ratio = 0.3; break;
      case 'custom': ratio = customQuality / 100; break;
    }
    
    const size = Math.round(originalSize * ratio);
    setCompressedSize(size);
    return formatFileSize(size);
  };

  const handleCompress = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Simulate PDF compression (in a real app, you would process the PDF here)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate compressed size for display
      calculateCompressedSize();
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Failed to compress PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!file || !compressedSize) return;
    
    // In a real app, you would provide the actual compressed file for download
    alert('In a real implementation, this would download the compressed PDF file.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Compress PDF</CardTitle>
          <CardDescription>
            Reduce the file size of your PDF while maintaining good quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pdf-file">PDF File</Label>
              <Input 
                id="pdf-file" 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isLoading}
              />
            </div>

            {file && (
              <div className="mt-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Compression Level</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(Object.keys(COMPRESSION_LEVELS) as CompressionLevel[]).map((level) => (
                      <div 
                        key={level}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${
                          compressionLevel === level 
                            ? 'border-primary bg-primary/5' 
                            : 'border-muted hover:border-primary/50'
                        }`}
                        onClick={() => {
                          setCompressionLevel(level);
                          if (level !== 'custom') {
                            setCompressedSize(null);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {COMPRESSION_LEVELS[level].label}
                            {level === 'recommended' && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                                Recommended
                              </span>
                            )}
                          </span>
                          {compressionLevel === level && (
                            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {COMPRESSION_LEVELS[level].description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {compressionLevel === 'custom' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="quality">Quality: {customQuality}%</Label>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 mr-1" />
                        {customQuality < 30 ? 'Maximum compression' : 
                         customQuality < 60 ? 'Balanced' : 'Best quality'}
                      </div>
                    </div>
                    <Slider
                      id="quality"
                      min={10}
                      max={90}
                      step={5}
                      value={[customQuality]}
                      onValueChange={([value]) => {
                        setCustomQuality(value);
                        setCompressedSize(null);
                      }}
                      className="py-4"
                      disabled={isLoading}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <FileUp className="h-4 w-4 mr-2" />
                      <span className="text-sm">Original</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">
                        {originalSize ? formatFileSize(originalSize) : '--'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <FileDown className="h-4 w-4 mr-2" />
                      <span className="text-sm">Compressed</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">
                        {compressedSize ? formatFileSize(compressedSize) : calculateCompressedSize()}
                      </span>
                      {compressedSize && originalSize && (
                        <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                          ({(100 - (compressedSize / originalSize * 100)).toFixed(0)}% smaller)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {compressedSize ? (
              <Button 
                type="button" 
                onClick={handleDownload}
                disabled={!file || !compressedSize}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Download Compressed PDF
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleCompress}
                disabled={!file || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Compress PDF
                  </>
                )}
              </Button>
            )}
          </div>

          {file && (
            <div className="mt-6 p-4 bg-muted/30 rounded-md">
              <h4 className="font-medium mb-3">Tips for better compression:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Use higher compression for documents that will be viewed on screen only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>For printing, use medium or low compression to maintain quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Scanned documents can often be compressed more than digital documents</span>
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
