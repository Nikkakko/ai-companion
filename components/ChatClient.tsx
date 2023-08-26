import { Companion, Message } from '@prisma/client';
import React from 'react';
import ChatHeader from './ChatHeader';

interface Props {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ companion }: Props) => {
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion} />
    </div>
  );
};

export default ChatClient;