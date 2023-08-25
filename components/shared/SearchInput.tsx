'use client';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import qs from 'query-string';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');
  const [value, setValue] = useState(name || '');

  //create a debounce function
  const debouncedSearchTerm = useDebounce<string>(value, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedSearchTerm,
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debouncedSearchTerm, router, categoryId]);

  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
      <Input
        className='pl-10 bg-primary/10'
        placeholder='Search...'
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
