import CompanionForm from '@/components/CompanionForm';
import prismadb from '@/lib/prismadb';
import React from 'react';

interface Props {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params: { companionId } }: Props) => {
  //TODO:check subscription

  const companion = await prismadb.companion.findUnique({
    where: {
      id: companionId,
    },
  });

  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
