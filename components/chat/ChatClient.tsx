'use client';
import { Companion, Message } from '@prisma/client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from 'ai/react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import { ChatMessageProps } from './chat-message';

interface Props {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ companion }: Props) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );

  const { handleInputChange, handleSubmit, isLoading, input, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish: (prompt, completion) => {
        const systemMessage: ChatMessageProps = {
          role: 'system',
          content: completion,
        };

        setMessages(messages => [...messages, systemMessage]);
        setInput('');

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: 'user',
      content: input,
    };

    setMessages(messages => [...messages, userMessage]);

    handleSubmit(e);
  };
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        messages={messages}
        isLoading={isLoading}
      />

      <ChatForm
        isLoading={isLoading}
        input={input}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default ChatClient;
