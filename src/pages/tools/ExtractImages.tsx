import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ExtractedImage {
  url: string;
  pageNumber: number;
  dimensions: { width: number; height: number };
}

export default function ExtractImages() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<ExtractedImage[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file to extract images from.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate image extraction (in a real app, you would process the PDF here)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extracted images with more details
      const mockImages: ExtractedImage[] = [
        { 
          url: 'https://via.placeholder.com/200x150?text=Image+1',
          pageNumber: 1,
          dimensions: { width: 200, height: 150 }
        },
        { 
          url: 'https://via.placeholder.com/300x200?text=Image+2',
          pageNumber: 2,
          dimensions: { width: 300, height: 200 }
        },
        { 
          url: 'https://via.placeholder.com/250x180?text=Image+3',
          pageNumber: 3,
          dimensions: { width: 250, height: 180 }
        },
      ];
      setImages(mockImages);
      toast({
        title: 'Images extracted!',
        description: `Successfully extracted ${mockImages.length} images from your PDF.`,
      });
    } catch (error) {
      console.error('Error extracting images:', error);
      toast({
        title: 'Error',
        description: 'Failed to extract images. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAllImages = async () => {
    if (images.length === 0) return;
    
    setIsDownloading(true);
    try {
      // In a real app, you would create a zip file and download all images
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Download started!',
        description: 'Your images are being downloaded as a ZIP file.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Could not download images. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <ImageIcon className="w-8 h-8 text-purple-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Extract Images from PDF</CardTitle>
            <CardDescription className="text-gray-600">
              Upload a PDF file to extract all embedded images in high quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-8">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="mb-4 text-gray-600">Drag and drop your PDF file here, or click to browse</p>
              <input
                type="file"
                id="pdf-upload"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              <Button 
                asChild
                variant="outline"
                className="border-2 border-gray-300 hover:border-purple-500"
              >
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Select PDF File'
                  )}
                </label>
              </Button>
              {file && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md inline-block">
                  <p className="text-sm text-gray-700">
                    Selected: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                </div>
              )}
              <Button 
                className="mt-6 w-full max-w-xs mx-auto"
                onClick={handleSubmit}
                disabled={!file || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extracting Images...
                  </>
                ) : (
                  'Extract Images'
                )}
              </Button>
            </div>

            {images.length > 0 && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Extracted Images <span className="text-gray-500 text-sm font-normal">({images.length} found)</span>
                  </h3>
                  <Button 
                    onClick={downloadAllImages} 
                    disabled={isDownloading}
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? 'Preparing...' : 'Download All'}
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white group"
                    >
                      <div className="relative pt-[75%] bg-gray-50">
                        <img 
                          src={img.url} 
                          alt={`Extracted from page ${img.pageNumber}`}
                          className="absolute inset-0 w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="p-3 border-t">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800">Image {index + 1}</p>
                            <p className="text-xs text-gray-500">
                              Page {img.pageNumber} • {img.dimensions.width}×{img.dimensions.height}px
                            </p>
                          </div>
                          <a 
                            href={img.url} 
                            download
                            className="text-gray-400 hover:text-purple-500 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
