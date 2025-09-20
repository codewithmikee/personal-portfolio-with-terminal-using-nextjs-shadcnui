"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function Contact() {
  const { portfolio: data, isLoading: loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded mb-12 w-1/3 mx-auto"></div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-muted rounded"></div>
                    <div className="h-10 bg-muted rounded"></div>
                    <div className="h-10 bg-muted rounded"></div>
                    <div className="h-20 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { profile } = data;

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Let's Work Together
              </h3>
              <p className="text-muted-foreground mb-8 text-pretty">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span>{profile.address}</span>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  {profile.contacts.map((contact, index) => (
                    <Button key={index} variant="outline" size="sm" asChild>
                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.name === "GitHub" && (
                          <Github className="w-4 h-4 mr-2" />
                        )}
                        {contact.name === "LinkedIn" && (
                          <Linkedin className="w-4 h-4 mr-2" />
                        )}
                        {contact.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>

              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>

                  <Input type="email" placeholder="Email Address" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={4} />

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
