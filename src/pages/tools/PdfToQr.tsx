import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PdfToQr() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string>('');

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
      // Simulate QR code generation (in a real app, you would upload the file and generate a QR code)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + 
        encodeURIComponent('https://pdftourls.com/document/example123'));
      setShortUrl('https://pdftourls.com/abc123');
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>PDF to QR Code</CardTitle>
          <CardDescription>
            Upload a PDF and generate a QR code for easy sharing
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
              {isLoading ? 'Generating QR Code...' : 'Generate QR Code'}
            </Button>
          </form>

          {qrCodeUrl && (
            <div className="mt-8 space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-lg font-medium">Your QR Code</h3>
                <img 
                  src={qrCodeUrl} 
                  alt="PDF QR Code" 
                  className="w-48 h-48 border rounded-md p-2"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Download QR Code
                  </Button>
                  <Button variant="outline" size="sm">
                    Copy QR Code
                  </Button>
                </div>
              </div>

              {shortUrl && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Short URL:</p>
                  <div className="flex items-center gap-2">
                    <a 
                      href={shortUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {shortUrl}
                    </a>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
