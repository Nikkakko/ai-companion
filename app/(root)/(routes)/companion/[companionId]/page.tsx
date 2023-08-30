import CompanionForm from '@/components/companion/CompanionForm';
import prismadb from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params: { companionId } }: Props) => {
  const { userId } = auth();
  const isPro = await checkSubscription();

  //TODO:check subscription

  if (!userId) {
    return redirectToSignIn();
  }

  if (!isPro) {
    return redirect('/');
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: companionId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
