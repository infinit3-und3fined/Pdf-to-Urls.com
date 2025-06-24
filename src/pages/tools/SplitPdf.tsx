import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X, Scissors, Download } from "lucide-react";

type SplitRange = {
  id: string;
  start: number;
  end: number | null;
};

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [ranges, setRanges] = useState<SplitRange[]>([]);
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      
      // Simulate getting page count (in a real app, you'd use a PDF library)
      const mockPageCount = Math.floor(Math.random() * 20) + 5; // Random between 5-25
      setPageCount(mockPageCount);
      
      // Reset ranges
      setRanges([{ id: '1', start: 1, end: mockPageCount }]);
      setSelectedRange('1');
    }
  };

  const addRange = () => {
    if (!pageCount) return;
    
    const newId = (ranges.length + 1).toString();
    setRanges([...ranges, { id: newId, start: 1, end: pageCount }]);
    setSelectedRange(newId);
  };

  const removeRange = (id: string) => {
    const newRanges = ranges.filter(range => range.id !== id);
    setRanges(newRanges);
    
    if (selectedRange === id) {
      setSelectedRange(newRanges.length > 0 ? newRanges[0].id : null);
    }
  };

  const updateRange = (id: string, updates: Partial<SplitRange>) => {
    setRanges(ranges.map(range => 
      range.id === id ? { ...range, ...updates } : range
    ));
  };

  const handleSplit = async () => {
    if (!file || !pageCount) return;
    
    setIsLoading(true);
    try {
      // Simulate PDF splitting (in a real app, you would process the PDF here)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success - in a real app, you would provide download links for each split
      alert('PDF split successfully! In a real implementation, you would get download links here.');
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Failed to split PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentRange = ranges.find(r => r.id === selectedRange);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Split PDF</CardTitle>
          <CardDescription>
            Split a PDF document into multiple documents by page ranges
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

            {pageCount && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <Label>Page Ranges</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addRange}
                    disabled={!file || ranges.length >= 5}
                  >
                    Add Range
                  </Button>
                </div>

                <div className="space-y-4">
                  {ranges.map((range) => (
                    <div 
                      key={range.id}
                      className={`p-4 border rounded-md ${
                        selectedRange === range.id ? 'border-primary' : 'border-muted'
                      }`}
                      onClick={() => setSelectedRange(range.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Document {range.id}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRange(range.id);
                          }}
                          disabled={ranges.length <= 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`start-${range.id}`} className="block mb-1">
                            From page
                          </Label>
                          <Input
                            id={`start-${range.id}`}
                            type="number"
                            min={1}
                            max={range.end || pageCount}
                            value={range.start}
                            onChange={(e) => 
                              updateRange(range.id, { 
                                start: Math.min(Number(e.target.value), range.end || pageCount || 1) 
                              })
                            }
                            className="w-24"
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`end-${range.id}`} className="block mb-1">
                            To page (leave empty for all remaining pages)
                          </Label>
                          <Input
                            id={`end-${range.id}`}
                            type="number"
                            min={range.start}
                            max={pageCount}
                            value={range.end || ''}
                            onChange={(e) => 
                              updateRange(range.id, { 
                                end: e.target.value ? Number(e.target.value) : null 
                              })
                            }
                            placeholder={pageCount.toString()}
                            className="w-24"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={handleSplit}
              disabled={!file || ranges.length === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Scissors className="mr-2 h-4 w-4 animate-pulse" />
                  Splitting...
                </>
              ) : (
                <>
                  <Scissors className="mr-2 h-4 w-4" />
                  Split PDF
                </>
              )}
            </Button>
          </div>

          {pageCount && (
            <div className="mt-6 p-4 bg-muted/50 rounded-md">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: Math.min(pageCount, 20) }).map((_, i) => {
                  const range = ranges.find(r => 
                    i + 1 >= (r.start || 1) && 
                    (r.end ? i + 1 <= r.end : true)
                  );
                  
                  const isInCurrentRange = range?.id === selectedRange;
                  const colorClasses = isInCurrentRange 
                    ? 'bg-primary text-primary-foreground' 
                    : range 
                      ? 'bg-primary/20' 
                      : 'bg-muted';
                  
                  return (
                    <div 
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center text-xs border rounded-sm ${
                        colorClasses
                      } ${i === 0 ? 'rounded-l-md' : ''} ${
                        i === Math.min(pageCount, 20) - 1 ? 'rounded-r-md' : ''
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
                {pageCount > 20 && (
                  <div className="flex items-center text-muted-foreground text-sm">
                    +{pageCount - 20} more
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
