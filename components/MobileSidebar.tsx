import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';

const MobileSidebar = ({ isPro }: { isPro: boolean }) => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4'>
        <Menu />
      </SheetTrigger>

      <SheetContent className='p-0 pt-10 bg-secondary w-32' side='left'>
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
