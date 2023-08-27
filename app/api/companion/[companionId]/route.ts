import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse('Companion ID is required', {
        status: 400,
      });
    }

    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', {
        status: 400,
      });
    }

    //TODO:: check for subscription

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName as string,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log(error, 'Companion PATCH ERROR');
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  params: {
    params: {
      companionId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!params.params.companionId) {
      return new NextResponse('Companion ID is required', {
        status: 400,
      });
    }

    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const companion = await prismadb.companion.delete({
      where: {
        userId,
        id: params.params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log(error, 'Companion DELETE ERROR');
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}
