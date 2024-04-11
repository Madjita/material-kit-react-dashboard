import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = withAuthGuard(({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  
  useEffect(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [pathname]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(!openNav)} />
      <SideNav onClose={() => setOpenNav(!openNav)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});

export default Layout;
