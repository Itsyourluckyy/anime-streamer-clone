
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would send the data to a server
    setTimeout(() => {
      toast.success("Your message has been sent!");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 pt-32 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback about AnimeStream? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Type your message here..."
                  rows={5}
                  className="resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
          
          <div className="bg-orange-50 p-8 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Email Us Directly</h3>
                <a 
                  href="mailto:tacfiregamer@gmail.com" 
                  className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  tacfiregamer@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  Our support team is available 24/7 to help you with any questions or issues you may have.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Business Inquiries</h3>
                <p className="text-gray-600">
                  For business inquiries, please email us with the subject line "Business Inquiry".
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium text-lg mb-2">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
