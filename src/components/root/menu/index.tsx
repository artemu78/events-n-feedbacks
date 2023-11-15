import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Campaign as CampaignIcon,
  ExpandLess,
  ExpandMore,
  Feedback as FeedbackIcon,
  Group as GroupIcon,
  GroupAdd as GroupAddIcon,
} from '@mui/icons-material';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { UserStatus } from '@/types';

const menuItems = [
  {
    name: 'Events',
    icon: <CampaignIcon />,
    path: '/events',
  },
  {
    name: 'My feedbacks',
    icon: <FeedbackIcon />,
    path: '/feedbacks',
  },
  {
    name: 'Speakers',
    icon: <GroupIcon />,
    path: '/speakers',
  },
  {
    name: 'Moderators',
    icon: <InterpreterModeIcon />,
    path: '/moderators',
  },
];

const adminMenuItems = [
  {
    name: 'Add event',
    icon: <CampaignIcon />,
    path: '/admin/addevent',
  },
  // {
  //   name: "Add speaker",
  //   icon: <GroupAddIcon />,
  //   path: "/admin/addspeaker",
  // },
];

const Menu = () => {
  return (
    <List>
      {menuItems.map(({ name, icon, path }, index) => (
        <ListItem key={name + index.toString()} disablePadding>
          <Link href={path} passHref>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
      <Divider />

      <AdminMenu />
    </List>
  );
};

const AdminMenu = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const UserState = useSelector((state: RootState) => state.user.status);
  if (UserState !== UserStatus.SUCCEEDED) return null;
  return adminMenuItems.map(({ name, icon, path }, index) => (
    <Box key={name}>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" sx={{ pl: 2 }} disablePadding>
          <ListItem key={name + index.toString()} disablePadding>
            <Link href={path} passHref>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Collapse>
    </Box>
  ));
};

export default Menu;
