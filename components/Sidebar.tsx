'use client';
import { routes } from '@/constants/routes';
import { useProModel } from '@/hooks/use-pro-model';
import { cn } from '@/lib/utils';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Sidebar = ({ isPro }: { isPro: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen } = useProModel();

  const onNavigate = (href: string, pro: boolean) => {
    //TODO check if pro
    if (pro && !isPro) return onOpen();

    router.push(href);
  };

  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex flex-1 justify-center '>
        <div className='space-y-2'>
          {routes.map(route => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className='flex flex-col gap-y-2 items-center flex-1'>
                <route.icon className='w-5 h-5' />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
