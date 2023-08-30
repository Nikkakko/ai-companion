'use client';

import { useProModel } from '@/hooks/use-pro-model';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from './ui/dialog';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

const ProModal = () => {
  const { isOpen, onClose, onOpen } = useProModel();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/stripe');

      window.location.href = res.data.url;
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>Upgrade to Pro</DialogTitle>

          <DialogDescription className='text-center space-y-2'>
            Create{' '}
            <span className='text-sky-500 mx-1 font-medium'>Custom AI</span>{' '}
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <div className='flex justify-between '>
          <p className='text-2xl font-medium'>
            $9
            <span className='text-sm font-normal'>.99 / month</span>
          </p>
          <Button
            variant='premium'
            onClick={handleSubscribe}
            disabled={loading}
          >
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
