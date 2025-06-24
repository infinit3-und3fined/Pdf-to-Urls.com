import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Loader2, FileText, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ExtractionOptions = {
  preserveLayout: boolean;
  includePageNumbers: boolean;
  includeImages: boolean;
  includeFormatting: boolean;
};

export default function ExtractText() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [options, setOptions] = useState<ExtractionOptions>({
    preserveLayout: true,
    includePageNumbers: true,
    includeImages: false,
    includeFormatting: true,
  });
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      setFileName(newFile.name.replace(/\.\w+$/, '.txt'));
      setExtractedText('');
    }
  };

  const handleOptionChange = (key: keyof ExtractionOptions, value: boolean) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const extractText = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Simulate text extraction (in a real app, you would use a PDF library)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extracted text
      const mockText = `This is a sample extracted text from the PDF document.
      
In a real implementation, this would contain the actual text content extracted from your PDF document.
      
The extraction would respect your selected options like preserving layout and including page numbers.`;
      
      setExtractedText(mockText);
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('Failed to extract text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
  };

  const downloadTextFile = () => {
    if (!extractedText) return;
    
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName || 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Extract Text from PDF</CardTitle>
          <CardDescription>
            Extract and copy text content from your PDF documents
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Extraction Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="preserve-layout" 
                        checked={options.preserveLayout}
                        onCheckedChange={(checked) => handleOptionChange('preserveLayout', checked)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="preserve-layout">Preserve layout</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="page-numbers" 
                        checked={options.includePageNumbers}
                        onCheckedChange={(checked) => handleOptionChange('includePageNumbers', checked)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="page-numbers">Include page numbers</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="include-images" 
                        checked={options.includeImages}
                        onCheckedChange={(checked) => handleOptionChange('includeImages', checked)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="include-images">Include image placeholders</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="include-formatting" 
                        checked={options.includeFormatting}
                        onCheckedChange={(checked) => handleOptionChange('includeFormatting', checked)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="include-formatting">Preserve text formatting</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="button" 
                  onClick={extractText}
                  disabled={!file || isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Extract Text
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {extractedText && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Extracted Text</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadTextFile}
                    className="gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Textarea 
                  className="min-h-[200px] font-mono text-sm" 
                  value={extractedText}
                  readOnly
                />
                <div className="absolute right-2 top-2 text-xs text-muted-foreground">
                  {extractedText.length} characters
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md text-sm space-y-2">
                <div className="font-medium">Text Analysis:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Words: {extractedText.split(/\s+/).filter(Boolean).length}</div>
                  <div>Characters: {extractedText.length}</div>
                  <div>Lines: {extractedText.split('\n').length}</div>
                  <div>Spaces: {extractedText.split(' ').length - 1}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
