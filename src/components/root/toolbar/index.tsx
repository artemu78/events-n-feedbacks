import { Login as LoginIcon, Menu as MenuIcon } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '@/services/firebaseservice';
import { RootState } from '@/store';
import { clearUser } from '@/store/userslice';
import { UserClient, UserState } from '@/types';
import { LoadStatus } from '@/types';
interface ToolbarCustomProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const settings = [{ label: 'Profile', id: 'profile' }];
type ISettingsIds = (typeof settings)[number]['id'];
const ToolbarCustom = ({ handleDrawerOpen, open }: ToolbarCustomProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const user = userState.user;

  let userComponent = null;
  if (user) userComponent = <UserAvatar user={user} />;
  else {
    if (userState.status === LoadStatus.LOADING)
      userComponent = <CircularProgress />;
    else
      userComponent = (
        <Link href="/signin" passHref>
          <Button color="inherit" startIcon={<LoginIcon />} sx={{ mr: 2 }}>
            Sign In
          </Button>
        </Link>
      );
  }
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Link
        href="/"
        passHref
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <img src="/logo.png" alt="logo" style={{ height: '40px' }} />
        <Typography variant="h6" noWrap component="div">
          Events and feedbacks
        </Typography>
      </Link>
      {userComponent}
      {/* <Link href="signup" passHref>
        <Button color="inherit" startIcon={<PersonAddIcon />}>
          Sign Up
        </Button>
      </Link> */}
    </Toolbar>
  );
};

interface UserAvatarProps {
  user: UserClient;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menuItem: ISettingsIds) => async () => {
    if (menuItem === 'logout') {
      await logout();
      document.cookie = 'session=;path=/;max-age=0;';
      dispatch(clearUser());
    }
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user.displayName || undefined}
            src={user.photoURL || undefined}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => {
          setAnchorElUser(null);
        }}
      >
        {settings.map((setting) => (
          <Link key={setting.id} href={`/${setting.id}`}>
            <MenuItem>
              <Typography textAlign="center">{setting.label}</Typography>
            </MenuItem>
          </Link>
        ))}
        <MenuItem key={'logout'} onClick={handleCloseUserMenu('logout')}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ToolbarCustom;
