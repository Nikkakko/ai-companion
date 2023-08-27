import { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SendHorizonal } from 'lucide-react';

interface Props {
  isLoading: boolean;
  input: string;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const ChatForm = ({ isLoading, input, onSubmit, handleInputChange }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className='border-t border-primary/10 py-4 flex items-center gap-x-2'
    >
      <Input
        disabled={isLoading}
        placeholder='Type a message...'
        value={input}
        onChange={handleInputChange}
        className='rounded-lg bg-primary/10'
      />

      <Button disabled={isLoading} variant='ghost' className='h-6 w-6'>
        <SendHorizonal />
      </Button>
    </form>
  );
};

export default ChatForm;
