import Categories from '@/components/Categories';
import Companions from '@/components/Companions';
import SearchInput from '@/components/shared/SearchInput';
import prismadb from '@/lib/prismadb';

interface Props {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const categories = await prismadb.category.findMany();
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}
