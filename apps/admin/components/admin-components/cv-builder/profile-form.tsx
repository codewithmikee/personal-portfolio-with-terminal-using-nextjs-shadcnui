"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { Plus, X } from "lucide-react";
import type { Profile, Contact } from "@/types/portfolio";

interface ProfileFormProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}

export function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const addContact = () => {
    const newContact: Contact = {
      name: "",
      icon: "",
      link: "",
    };
    onUpdate({
      contacts: [...profile.contacts, newContact],
    });
  };

  const updateContact = (index: number, updates: Partial<Contact>) => {
    const updatedContacts = profile.contacts.map((contact, i) =>
      i === index ? { ...contact, ...updates } : contact
    );
    onUpdate({ contacts: updatedContacts });
  };

  const removeContact = (index: number) => {
    const updatedContacts = profile.contacts.filter((_, i) => i !== index);
    onUpdate({ contacts: updatedContacts });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.full_name}
              onChange={(e) => onUpdate({ full_name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone_number}
              onChange={(e) => onUpdate({ phone_number: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Professional Summary</Label>
          <Textarea
            id="description"
            value={profile.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Brief description of your professional background and expertise"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="profilePicture">Profile Picture URL</Label>
          <Input
            id="profilePicture"
            value={profile.profile_picture}
            onChange={(e) => onUpdate({ profile_picture: e.target.value })}
            placeholder="/path/to/your/photo.jpg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Contact Links</Label>
            <Button onClick={addContact} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Contact
            </Button>
          </div>
          <div className="space-y-3">
            {profile.contacts.map((contact, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    value={contact.name}
                    onChange={(e) =>
                      updateContact(index, { name: e.target.value })
                    }
                    placeholder="Platform name (e.g., LinkedIn)"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={contact.link}
                    onChange={(e) =>
                      updateContact(index, { link: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <Button
                  onClick={() => removeContact(index)}
                  size="sm"
                  variant="outline"
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
