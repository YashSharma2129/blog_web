
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const ShareDialog = ({ open, onOpenChange, postTitle }) => {
  const shareUrl = window.location.href;
  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', color: 'bg-blue-600' },
    { icon: FaTwitter, label: 'Twitter', color: 'bg-sky-500' },
    { icon: FaLinkedin, label: 'LinkedIn', color: 'bg-blue-700' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">Share "{postTitle}" with your network</p>
            
            {/* Social Share Buttons */}
            <div className="flex gap-2 justify-center">
              {socialLinks.map(({ icon: Icon, label, color }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="icon"
                  className={`${color} text-white hover:opacity-90`}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Share Link */}
            <div className="flex gap-2">
              <Input
                readOnly
                value={shareUrl}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;