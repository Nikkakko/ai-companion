import { Companion } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { Card, CardFooter, CardHeader } from '../ui/card';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

const Companions = ({ data }: Props) => {
  if (data.length === 0) {
    return (
      <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
        <div className='relative w-60 h-60'>
          <Image fill className='grayscale' alt='empty' src='/empty.png' />
        </div>

        <p className='text-sm text-muted-foreground'>No companions found.</p>

        <Button asChild>
          <Link href='/companion/new'>Create a companion</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10'>
      {data.map(companion => (
        <Card
          key={companion.id}
          className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-70 transition border-0'
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
              <div className='relative w-32 h-32'>
                <Image
                  src={companion.src}
                  fill
                  alt={companion.name}
                  className='rounded-xl object-cover'
                />
              </div>
              <p className='font-bold'>{companion.name}</p>
              <p className='text-xs'>{companion.description}</p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
              <p className='lowercase'>@{companion.userName}</p>
              <div className='flex items-center'>
                <MessageSquare className='mr-1 w-3 h-3' />
                {companion._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Companions;
