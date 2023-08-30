'use client';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Menu, Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './shared/mode-toggle';
import MobileSidebar from './MobileSidebar';
import { useProModel } from '@/hooks/use-pro-model';
import { useRouter } from 'next/navigation';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface NavbarProps {
  isPro: boolean;
}

const Navbar = ({ isPro }: NavbarProps) => {
  const { onOpen } = useProModel();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!isPro) {
      onOpen();
    } else {
      router.push('/settings');
    }
  };

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center '>
        <MobileSidebar />
        <Link href='/'>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        {!isPro && (
          <Button
            className=''
            variant='premium'
            size='sm'
            onClick={handleSubscribe}
          >
            Upgrade to Pro
            <Sparkles className='inline-block ml-2 h-4 w-4 fill-white text-white' />
          </Button>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
