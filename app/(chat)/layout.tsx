import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='mx-auto max-w-4xl h-full w-full'>{children}</div>;
};

export default ChatLayout;
