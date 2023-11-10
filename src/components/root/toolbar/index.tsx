import { Login as LoginIcon, Menu as MenuIcon } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { logout } from "@/services/firebaseservice";
import { RootState } from "@/store";
import { clearUser } from "@/store/userslice";
import { User, UserState } from "@/types";
interface ToolbarCustomProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const settings = [{ label: "Logout", id: "logout" }];
type ISettingsIds = (typeof settings)[number]["id"];

const ToolbarCustom = ({ handleDrawerOpen, open }: ToolbarCustomProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Link href="/" passHref>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Events and feedbacks
        </Typography>
      </Link>
      {user ? (
        <UserAvatar user={user} />
      ) : (
        <Link href="/signin" passHref>
          <Button color="inherit" startIcon={<LoginIcon />} sx={{ mr: 2 }}>
            Sign In
          </Button>
        </Link>
      )}
      {/* <Link href="signup" passHref>
        <Button color="inherit" startIcon={<PersonAddIcon />}>
          Sign Up
        </Button>
      </Link> */}
    </Toolbar>
  );
};

interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menuItem: ISettingsIds) => async () => {
    if (menuItem === "logout") {
      await logout();
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
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.id} onClick={handleCloseUserMenu(setting.id)}>
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ToolbarCustom;
