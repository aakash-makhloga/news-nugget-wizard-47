
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    alert('Your message has been sent! We will get back to you soon.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-1 pt-20 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                        <Input id="first-name" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                        <Input id="last-name" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="johndoe@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="How can we help you?" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your inquiry or feedback..." 
                        rows={5}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Here's how you can reach us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-gray-600 mt-1">For general inquiries:</p>
                      <p className="text-sm font-medium">hello@finnews.com</p>
                      <p className="text-sm text-gray-600 mt-1">For press:</p>
                      <p className="text-sm font-medium">press@finnews.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm font-medium">(555) 123-4567</p>
                      <p className="text-sm text-gray-600 mt-1">Monday to Friday, 9am - 5pm ET</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Visit Us</h3>
                      <p className="text-sm font-medium">FinNews Headquarters</p>
                      <p className="text-sm text-gray-600">123 Finance Street</p>
                      <p className="text-sm text-gray-600">New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                        <div>Monday - Friday:</div>
                        <div>9:00 AM - 5:00 PM</div>
                        <div>Saturday:</div>
                        <div>10:00 AM - 2:00 PM</div>
                        <div>Sunday:</div>
                        <div>Closed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Editorial Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Have a news tip or want to contribute? Our editorial team is always looking 
                        for insightful perspectives and breaking financial news.
                      </p>
                      <p className="text-sm font-medium mt-2">
                        Email: editorial@finnews.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How can I subscribe to your newsletter?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    You can subscribe to our daily or weekly newsletter by visiting our home page and 
                    entering your email in the subscription box, or by clicking on the "Subscribe" link 
                    in the footer of any page.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer premium content?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Yes, we offer premium subscription plans that provide access to exclusive analysis, 
                    in-depth reports, and advanced market tools. Visit our subscription page 
                    for more details.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How can I report an error in an article?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We strive for accuracy in all our reporting. If you spot an error, 
                    please email corrections@finnews.com with the article title and a 
                    description of the error.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are you hiring?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We're always looking for talented individuals to join our team. 
                    Check our careers page for current openings or send your resume 
                    to careers@finnews.com.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Contact;
