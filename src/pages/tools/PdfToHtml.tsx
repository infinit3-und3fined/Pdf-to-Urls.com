import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, FileText, FileCode, Download, Copy, Eye, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ConversionOptions = {
  includeImages: boolean;
  preserveLayout: boolean;
  includeFonts: boolean;
  responsive: boolean;
  minify: boolean;
};

export default function PdfToHtml() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [options, setOptions] = useState<ConversionOptions>({
    includeImages: true,
    preserveLayout: true,
    includeFonts: true,
    responsive: true,
    minify: false,
  });
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      setFileName(newFile.name.replace(/\.\w+$/, '.html'));
      setHtmlContent('');
    }
  };

  const handleOptionChange = (key: keyof ConversionOptions, value: boolean) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const convertToHtml = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Simulate conversion (in a real app, you would process the PDF)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock HTML content
      const mockHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted from PDF - ${file.name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      ${options.responsive ? '' : 'min-width: 800px;'}
    }
    .page {
      ${options.preserveLayout ? 'background: white; padding: 20px; margin: 20px 0; box-shadow: 0 0 10px rgba(0,0,0,0.1);' : ''}
    }
    h1 { color: #1a365d; }
    p { margin-bottom: 1em; }
    ${options.includeFonts ? `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
    body { font-family: 'Roboto', sans-serif; }
    ` : ''}
  </style>
</head>
<body>
  <div class="page">
    <h1>Sample Converted PDF to HTML</h1>
    <p>This is a mock representation of what your converted PDF would look like in HTML format.</p>
    
    <h2>Document Information</h2>
    <ul>
      <li><strong>Original Filename:</strong> ${file.name}</li>
      <li><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</li>
      <li><strong>Last Modified:</strong> ${new Date(file.lastModified).toLocaleDateString()}</li>
    </ul>

    <h2>Sample Content</h2>
    <p>This is a paragraph demonstrating how text from your PDF would appear in the converted HTML document. The actual conversion would include all text content from your PDF while attempting to preserve the original formatting.</p>
    
    <p>Here's another paragraph to show how multiple paragraphs would be structured in the converted document. The converter would maintain proper spacing and formatting between different elements.</p>

    ${options.includeImages ? `
    <div class="image-container" style="text-align: center; margin: 20px 0;">
      <div style="background: #f0f0f0; padding: 20px; display: inline-block; border-radius: 4px;">
        <div style="color: #666; margin-bottom: 10px;">[Image placeholder]</div>
        <div style="font-size: 12px; color: #999;">Images from the PDF would appear here</div>
      </div>
    </div>
    ` : ''}

    <h3>Lists Example</h3>
    <ul>
      <li>First item in an unordered list</li>
      <li>Second item with some more text that might wrap to the next line if it's long enough</li>
      <li>Third and final item</li>
    </ul>

    <h3>Table Example</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
          <td>Row 1, Cell 3</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
          <td>Row 2, Cell 3</td>
        </tr>
      </tbody>
    </table>

    <p style="margin-top: 20px; font-size: 0.9em; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
      Document converted using PDFtoURLs - PDF to HTML Converter
    </p>
  </div>
</body>
</html>`;
      
      setHtmlContent(options.minify ? mockHtml.replace(/\s+/g, ' ').trim() : mockHtml);
      
      toast({
        title: "Conversion Complete",
        description: "Your PDF has been successfully converted to HTML.",
      });
    } catch (error) {
      console.error('Error converting PDF to HTML:', error);
      toast({
        title: "Conversion Failed",
        description: "There was an error converting your PDF to HTML. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!htmlContent) return;
    
    navigator.clipboard.writeText(htmlContent);
    toast({
      title: "Copied to Clipboard",
      description: "The HTML code has been copied to your clipboard.",
    });
  };

  const downloadHtmlFile = () => {
    if (!htmlContent) return;
    
    const element = document.createElement('a');
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = fileName || 'converted-document.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const previewInNewTab = () => {
    if (!htmlContent) return;
    
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-6 w-6" />
            PDF to HTML Converter
          </CardTitle>
          <CardDescription>
            Convert your PDF documents to clean, responsive HTML while preserving formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="pdf-file">PDF File</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="pdf-file" 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={isLoading}
                  className="flex-1"
                />
                {file && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setFile(null);
                      setHtmlContent('');
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {file && (
              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Conversion Options</h3>
                  <div className="space-y-4 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-images" className="flex flex-col space-y-1">
                        <span>Include Images</span>
                        <span className="font-normal text-muted-foreground text-sm">Embed images from the PDF in the HTML</span>
                      </Label>
                      <Switch
                        id="include-images"
                        checked={options.includeImages}
                        onCheckedChange={(checked) => handleOptionChange('includeImages', checked)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-layout" className="flex flex-col space-y-1">
                        <span>Preserve Layout</span>
                        <span className="font-normal text-muted-foreground text-sm">Maintain original document structure</span>
                      </Label>
                      <Switch
                        id="preserve-layout"
                        checked={options.preserveLayout}
                        onCheckedChange={(checked) => handleOptionChange('preserveLayout', checked)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-fonts" className="flex flex-col space-y-1">
                        <span>Include Fonts</span>
                        <span className="font-normal text-muted-foreground text-sm">Embed web fonts to match original text</span>
                      </Label>
                      <Switch
                        id="include-fonts"
                        checked={options.includeFonts}
                        onCheckedChange={(checked) => handleOptionChange('includeFonts', checked)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="responsive" className="flex flex-col space-y-1">
                        <span>Responsive Design</span>
                        <span className="font-normal text-muted-foreground text-sm">Make HTML adapt to different screen sizes</span>
                      </Label>
                      <Switch
                        id="responsive"
                        checked={options.responsive}
                        onCheckedChange={(checked) => handleOptionChange('responsive', checked)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="minify" className="flex flex-col space-y-1">
                        <span>Minify HTML</span>
                        <span className="font-normal text-muted-foreground text-sm">Reduce file size by removing whitespace</span>
                      </Label>
                      <Switch
                        id="minify"
                        checked={options.minify}
                        onCheckedChange={(checked) => handleOptionChange('minify', checked)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="button" 
                    onClick={convertToHtml}
                    disabled={!file || isLoading}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <FileCode className="h-4 w-4" />
                        Convert to HTML
                      </>
                    )}
                  </Button>
                  
                  {htmlContent && (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={previewInNewTab}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={downloadHtmlFile}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download HTML
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={copyToClipboard}
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy HTML
                      </Button>
                    </>
                  )}
                </div>
                
                {htmlContent && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>HTML Output</Label>
                      <div className="text-sm text-muted-foreground">
                        {htmlContent.length.toLocaleString()} characters • {Math.ceil(htmlContent.length / 1024)} KB
                      </div>
                    </div>
                    <div className="relative">
                      <pre className="p-4 bg-muted/50 rounded-md overflow-x-auto text-sm h-[400px]">
                        <code className="whitespace-pre-wrap break-words">
                          {htmlContent.length > 10000 
                            ? htmlContent.substring(0, 10000) + '\n\n... (content truncated for display)' 
                            : htmlContent}
                        </code>
                      </pre>
                      {htmlContent.length > 10000 && (
                        <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs text-muted-foreground">
                          Truncated for display
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {!file && (
            <div className="p-6 border-2 border-dashed rounded-lg text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No PDF Selected</h3>
              <p className="text-muted-foreground mb-4">
                Upload a PDF file to convert it to HTML with customizable options.
              </p>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select PDF File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
