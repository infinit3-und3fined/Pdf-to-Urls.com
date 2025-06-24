import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExtractImages() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      // Simulate image extraction (in a real app, you would process the PDF here)
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Mock extracted images
      setImages([
        'https://via.placeholder.com/200x150?text=Extracted+Image+1',
        'https://via.placeholder.com/200x150?text=Extracted+Image+2',
        'https://via.placeholder.com/200x150?text=Extracted+Image+3',
      ]);
    } catch (error) {
      console.error('Error extracting images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Extract Images from PDF</CardTitle>
          <CardDescription>
            Upload a PDF file to extract all embedded images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pdf-file">PDF File</Label>
              <Input 
                id="pdf-file" 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
                required 
              />
            </div>
            <Button type="submit" disabled={isLoading || !file}>
              {isLoading ? 'Extracting Images...' : 'Extract Images'}
            </Button>
          </form>

          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Extracted Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Extracted ${index + 1}`} 
                      className="w-full h-auto"
                    />
                    <div className="p-2 text-sm text-center">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
