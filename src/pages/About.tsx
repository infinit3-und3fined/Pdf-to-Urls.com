import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>About PDFtoURLs</CardTitle>
          <CardDescription>
            Learn more about our mission and the team behind PDFtoURLs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At PDFtoURLs, we're dedicated to making PDF sharing and link extraction simple and efficient. 
              Our goal is to provide users with powerful yet easy-to-use tools for working with PDFs online.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Extract clickable URLs from any PDF document</li>
              <li>Generate shareable short links for your PDFs</li>
              <li>Create QR codes for easy mobile access</li>
              <li>Embed PDFs directly on your website</li>
              <li>Secure and private - your files are processed in your browser</li>
            </ul>
          </section>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild>
              <Link to="/tools/pdf-to-url">Try Our Tool</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
