import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Lock, Download, Copy, Loader2, Shield, Clock, X, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type SecuritySettings = {
  password: string;
  disablePrinting: boolean;
  disableCopying: boolean;
  expiresIn: number; // hours
  maxViews: number;
};

type ViewerSettings = {
  zoom: number;
  showThumbnails: boolean;
  darkMode: boolean;
};

export default function SecureViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState<SecuritySettings>({
    password: '',
    disablePrinting: true,
    disableCopying: true,
    expiresIn: 24,
    maxViews: 10,
  });
  const [viewerSettings, setViewerSettings] = useState<ViewerSettings>({
    zoom: 100,
    showThumbnails: true,
    darkMode: false,
  });
  const [viewerKey, setViewerKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      setIsSecured(false);
      setViewerUrl(null);
    }
  };

  const handleSettingChange = (key: keyof SecuritySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleViewerSettingChange = (key: keyof ViewerSettings, value: any) => {
    setViewerSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const secureDocument = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Simulate document securing (in a real app, you would upload and process the file)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock secure URL
      const mockUrl = 'https://secure-viewer.pdftourls.com/abc123';
      setViewerUrl(mockUrl);
      setIsSecured(true);
      
      toast({
        title: "Document Secured",
        description: "Your document is now protected with the specified security settings.",
      });
      
      // Force re-render of the viewer
      setViewerKey(prev => prev + 1);
    } catch (error) {
      console.error('Error securing document:', error);
      toast({
        title: "Error",
        description: "Failed to secure document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!viewerUrl) return;
    
    navigator.clipboard.writeText(viewerUrl);
    toast({
      title: "Link Copied",
      description: "The secure viewer link has been copied to your clipboard.",
    });
  };

  const resetForm = () => {
    setFile(null);
    setViewerUrl(null);
    setIsSecured(false);
    setSettings({
      password: '',
      disablePrinting: true,
      disableCopying: true,
      expiresIn: 24,
      maxViews: 10,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Secure PDF Viewer
          </CardTitle>
          <CardDescription>
            Share your PDFs securely with password protection and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isSecured ? (
            <>
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
                      <h3 className="font-medium">Security Settings</h3>
                      <div className="space-y-4 p-4 border rounded-md">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password Protection</Label>
                            <div className="relative flex-1 max-w-xs">
                              <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={settings.password}
                                onChange={(e) => handleSettingChange('password', e.target.value)}
                                placeholder="Leave empty for no password"
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="disable-printing" className="flex flex-col space-y-1">
                              <span>Disable Printing</span>
                              <span className="font-normal text-muted-foreground text-sm">Prevent document from being printed</span>
                            </Label>
                            <Switch
                              id="disable-printing"
                              checked={settings.disablePrinting}
                              onCheckedChange={(checked) => handleSettingChange('disablePrinting', checked)}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="disable-copying" className="flex flex-col space-y-1">
                              <span>Disable Copying</span>
                              <span className="font-normal text-muted-foreground text-sm">Prevent text and images from being copied</span>
                            </Label>
                            <Switch
                              id="disable-copying"
                              checked={settings.disableCopying}
                              onCheckedChange={(checked) => handleSettingChange('disableCopying', checked)}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="expires-in" className="flex flex-col space-y-1">
                              <span>Link Expires In</span>
                              <span className="font-normal text-muted-foreground text-sm">How long the link will be active</span>
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="expires-in"
                                type="number"
                                min="1"
                                max="720"
                                value={settings.expiresIn}
                                onChange={(e) => handleSettingChange('expiresIn', parseInt(e.target.value) || 1)}
                                className="w-20"
                              />
                              <span className="text-sm">hours</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="max-views" className="flex flex-col space-y-1">
                              <span>Maximum Views</span>
                              <span className="font-normal text-muted-foreground text-sm">Set to 0 for unlimited views</span>
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="max-views"
                                type="number"
                                min="0"
                                max="1000"
                                value={settings.maxViews}
                                onChange={(e) => handleSettingChange('maxViews', parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                              <span className="text-sm">views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Viewer Settings</h3>
                      <div className="space-y-4 p-4 border rounded-md">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="zoom-level" className="flex flex-col space-y-1">
                            <span>Default Zoom Level</span>
                          </Label>
                          <div className="flex items-center gap-2 w-40">
                            <span className="text-xs">50%</span>
                            <input
                              type="range"
                              id="zoom-level"
                              min="50"
                              max="200"
                              step="10"
                              value={viewerSettings.zoom}
                              onChange={(e) => handleViewerSettingChange('zoom', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-xs w-8 text-right">{viewerSettings.zoom}%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-thumbnails" className="flex flex-col space-y-1">
                            <span>Show Thumbnails</span>
                            <span className="font-normal text-muted-foreground text-sm">Display page thumbnails in sidebar</span>
                          </Label>
                          <Switch
                            id="show-thumbnails"
                            checked={viewerSettings.showThumbnails}
                            onCheckedChange={(checked) => handleViewerSettingChange('showThumbnails', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                            <span>Dark Mode</span>
                            <span className="font-normal text-muted-foreground text-sm">Enable dark theme for the viewer</span>
                          </Label>
                          <Switch
                            id="dark-mode"
                            checked={viewerSettings.darkMode}
                            onCheckedChange={(checked) => handleViewerSettingChange('darkMode', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="button" 
                        onClick={secureDocument}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Securing...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Secure & Generate Link
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="p-6 border rounded-lg bg-muted/20 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Document Secured Successfully</h3>
                <p className="text-muted-foreground mb-4">
                  Your document is now protected and ready to share. Copy the link below to share it with others.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
                  <div className="relative flex-1">
                    <Input 
                      value={viewerUrl || ''} 
                      readOnly 
                      className="pr-16 font-mono text-sm"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Button asChild>
                    <a 
                      href={viewerUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whitespace-nowrap"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Document
                    </a>
                  </Button>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-sm text-left">
                  <div className="flex items-start gap-3 p-3 bg-background rounded-md">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Link Expires</div>
                      <div className="text-muted-foreground">
                        {settings.expiresIn === 0 
                          ? 'Never' 
                          : `In ${settings.expiresIn} hour${settings.expiresIn !== 1 ? 's' : ''}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-background rounded-md">
                    <Eye className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Maximum Views</div>
                      <div className="text-muted-foreground">
                        {settings.maxViews === 0 ? 'Unlimited' : `${settings.maxViews} view${settings.maxViews !== 1 ? 's' : ''}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Secure Another Document
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Protected PDF
                </Button>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/20">
                <h4 className="font-medium mb-2">Tips for Sharing Securely</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Share the link only with intended recipients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>For sensitive documents, always set a password and limit the number of views</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You can revoke access at any time from your dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
