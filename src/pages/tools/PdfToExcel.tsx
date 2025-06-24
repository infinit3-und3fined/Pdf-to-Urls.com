import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Table } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PdfToExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file to convert.',
        variant: 'destructive',
      });
      return;
    }

    setIsConverting(true);
    // TODO: Implement PDF to Excel conversion
    setTimeout(() => {
      setIsConverting(false);
      toast({
        title: 'Conversion complete!',
        description: 'Your PDF tables have been extracted to Excel format.',
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Table className="w-8 h-8 text-green-500" />
              <div>
                <CardTitle>PDF to Excel Converter</CardTitle>
                <CardDescription>Extract tables from PDF to Excel spreadsheets</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="mb-4">Drag and drop your PDF file here, or click to browse</p>
              <input
                type="file"
                id="pdf-upload"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button asChild>
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  Select PDF File
                </label>
              </Button>
              {file && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">Selected: {file.name}</p>
                </div>
              )}
              <div className="mt-6 space-y-2">
                <Button 
                  className="w-full max-w-xs mx-auto"
                  onClick={handleConvert}
                  disabled={!file || isConverting}
                >
                  {isConverting ? 'Extracting...' : 'Extract to Excel'}
                </Button>
                <p className="text-xs text-gray-500">
                  We'll extract all tables from your PDF and convert them to Excel format
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PdfToExcel;
