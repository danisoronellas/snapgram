import { Outlet } from 'react-router-dom';

import Bottombar from '@/components/shared/Bottombar.tsx';
import LeftSidebar from '@/components/shared/LeftSidebar.tsx';
import Topbar from '@/components/shared/Topbar';

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex h-full flex-1">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
