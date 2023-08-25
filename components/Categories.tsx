'use client';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React from 'react';

interface CategoriesProps {
  data: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  const handleCategoryClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };
  return (
    <div className='w-full overflow-x-auto space-x-2 flex p-1'>
      <button
        onClick={() => handleCategoryClick(undefined)}
        className={cn(
          `
        flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md
        bg-primary/10 hover:opacity-75 transition
      `,
          !categoryId ? 'bg-primary/25' : 'bg-primary/10'
        )}
      >
        Newest
      </button>

      {data.map(item => (
        <button
          key={item.id}
          className={cn(
            `
             flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md
             bg-primary/10 hover:opacity-75 transition
           `,
            item.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
          )}
          onClick={() => handleCategoryClick(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
