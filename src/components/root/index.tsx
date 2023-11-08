import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

import Menu from '@/components/root/menu';
import Toolbar from '@/components/root/toolbar';

import styles from './index.module.css';
const drawerWidth = 240;

interface IMain {
    open: boolean;
    children: React.ReactNode;
    theme?: any;
}


const Main = ({ open, children, theme }: IMain) => {
    const combinedStyles = `${styles.mainBase} ${open ? styles.mainOpen : ''}`;
  
    return (
      <main className={combinedStyles}>
        {children}
      </main>
    );
  };

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  children?: React.ReactNode;
}

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const AppBar = ({ open, children }: AppBarProps) => {
    const combinedStyles = `${styles.appBarBase} ${open ? styles.appBarOpen : ''}`;
  
    return (
      <MuiAppBar className={combinedStyles}>
        {children}
      </MuiAppBar>
    );
  };

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

const DrawerHeader = ({ children }: AppBarProps) => {
    const combinedStyles = `${styles.drawerHeaderBase}`;
  
    return (
      <div className={combinedStyles}>
        {children}
      </div>
    );
  }
interface PersistentDrawerLeftProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
}

export default function PersistentDrawerLeft({open = false, setOpen, children}: PersistentDrawerLeftProps) {
//   const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar handleDrawerOpen={handleDrawerOpen} open={open} />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Menu />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}