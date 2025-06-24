import { useState, useRef, ChangeEvent, DragEvent, MouseEvent, ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, FileText, Download, Upload, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Extend the Window interface for custom properties
declare global {
  interface Window {
    showOpenFilePicker?: any;
    showDirectoryPicker?: () => Promise<any>;
  }
}

type ExtractionOptions = {
  preserveLayout: boolean;
  includePageNumbers: boolean;
  includeImages: boolean;
  includeFormatting: boolean;
};

const ExtractText: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [options, setOptions] = useState<ExtractionOptions>({
    preserveLayout: true,
    includePageNumbers: true,
    includeImages: false,
    includeFormatting: true,
  });
  const [fileName, setFileName] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const dt = e.dataTransfer;
    if (dt?.files?.[0]) {
      const newFile = dt.files[0];
      if (newFile.type === 'application/pdf') {
        setFile(newFile);
        setFileName(newFile.name.replace(/\.\w+$/, '.txt'));
        setExtractedText('');
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      const newFile = target.files[0];
      setFile(newFile);
      setFileName(newFile.name.replace(/\.\w+$/, '.txt'));
      setExtractedText('');
    }
  };

  const handleOptionChange = (key: keyof ExtractionOptions, value: boolean): void => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const extractText = async (): Promise<void> => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file to extract text from.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setExtractedText('');
    setWordCount(0);
    setCharCount(0);
    try {
      // Simulate text extraction with progress
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const progress = Math.min(100, (i + 1) * 20);
        toast({
          title: 'Extracting text...',
          description: `Processing your document (${progress}%)`,
        });
      }
      
      // Mock extracted text with more realistic content
      const mockText = `# Document Title

This is a sample of extracted text from your PDF document.

## Introduction

The quick brown fox jumps over the lazy dog. This is a test of the text extraction functionality. In a real application, this would be the actual text content extracted from the uploaded PDF file.

## Main Content

${Array(5).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nunc, quis aliquam nisl nunc quis nunc. Sed vitae nisl eget nisl aliquam tincidunt. Sed vitae nisl eget nisl aliquam tincidunt.').join('\n\n')}

## Conclusion

This concludes the sample extracted text. In a real scenario, this would contain the actual text from your PDF document.`;
      
      setExtractedText(mockText);
      setWordCount(mockText.split(/\s+/).length);
      setCharCount(mockText.length);
      
      // Scroll to results
      setTimeout(() => {
        textAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('Failed to extract text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (): Promise<void> => {
    if (!extractedText) return;
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(extractedText);
        toast({
          title: 'Copied to clipboard!',
          description: 'The extracted text has been copied to your clipboard.',
        });
      } else {
        // Fallback for browsers that don't support the clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = extractedText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        toast({
          title: 'Copied to clipboard!',
          description: 'The extracted text has been copied to your clipboard.',
        });
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Failed to copy',
        description: 'Could not copy text to clipboard. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadText = (): void => {
    if (!extractedText) return;
    
    if (typeof window === 'undefined') return;
    
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName || 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Download started!',
      description: 'Your text file is being downloaded.',
    });
  };

  const scrollToTop = (): void => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = 0;
      textAreaRef.current.focus();
    }
  };

  const scrollToBottom = (): void => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Extract Text from PDF</CardTitle>
            <CardDescription className="text-gray-600">
              Extract clean, searchable text from any PDF document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div 
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
                  'hover:border-blue-400',
                  'dark:border-gray-700 dark:hover:border-blue-500',
                  'focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent',
                  'transition-colors duration-200',
                  isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className={cn(
                  "w-12 h-12 mx-auto mb-4 transition-colors",
                  isDragging ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
                )} />
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {isDragging ? 'Drop your PDF here' : 'Drag and drop your PDF file here, or click to browse'}
                </p>
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <Button 
                  variant="outline"
                  className={cn(
                    "border-2 transition-colors",
                    isDragging 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-dashed border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {file ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="truncate max-w-xs">{file.name}</span>
                    </span>
                  ) : (
                    'Select PDF File'
                  )}
                </Button>
                {file && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setExtractedText('');
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-4 text-gray-800 dark:text-gray-200">Extraction Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'preserve-layout',
                      label: 'Preserve Layout',
                      description: 'Maintain original document structure',
                      checked: options.preserveLayout,
                      onChange: (checked: boolean) => handleOptionChange('preserveLayout', checked)
                    },
                    {
                      id: 'page-numbers',
                      label: 'Page Numbers',
                      description: 'Include page numbers in text',
                      checked: options.includePageNumbers,
                      onChange: (checked: boolean) => handleOptionChange('includePageNumbers', checked)
                    },
                    {
                      id: 'include-images',
                      label: 'Image ALT Text',
                      description: 'Include image descriptions',
                      checked: options.includeImages,
                      onChange: (checked: boolean) => handleOptionChange('includeImages', checked)
                    },
                    {
                      id: 'include-formatting',
                      label: 'Text Formatting',
                      description: 'Preserve bold, italics, etc.',
                      checked: options.includeFormatting,
                      onChange: (checked: boolean) => handleOptionChange('includeFormatting', checked)
                    }
                  ].map((option) => (
                    <div 
                      key={option.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{option.label}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
                      </div>
                      <Switch 
                        id={option.id}
                        checked={option.checked}
                        onCheckedChange={option.onChange}
                        disabled={isLoading}
                      />
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="default"
                  onClick={extractText} 
                  disabled={!file || isLoading}
                  className="w-full mt-6 py-6 text-base group"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Extracting Text...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      Extract Text from PDF
                    </>
                  )}
                </Button>
              </div>
              
              {extractedText && (
                <div className="space-y-4" ref={textAreaRef}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800 text-white p-4 rounded-lg">
                    <div>
                      <h3 className="font-medium text-lg">Extracted Text</h3>
                      <p className="text-sm text-gray-300">
                        {wordCount} words • {charCount.toLocaleString()} characters
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={copyToClipboard}
                        className="gap-1.5 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={downloadText}
                        className="gap-1.5 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:text-white"
                      >
                        <Download className="h-4 w-4" />
                        Download as TXT
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-64">
                      <div ref={textAreaRef}>
                        {extractedText || "Extracted text will appear here..."}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        onClick={scrollToTop}
                        title="Scroll to top"
                        aria-label="Scroll to top"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        onClick={scrollToBottom}
                        title="Scroll to bottom"
                        aria-label="Scroll to bottom"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ExtractText;
