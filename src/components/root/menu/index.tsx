import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Campaign as CampaignIcon,
  ExpandLess,
  ExpandMore,
  FactCheckOutlined as FactCheckOutlinedIcon,
  Feedback as FeedbackIcon,
  Group as GroupIcon,
  GroupAdd as GroupAddIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';
import {
  Avatar,
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
import { LoadStatus } from '@/types';

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
    name: 'Organizations',
    icon: <GroupsIcon />,
    path: '/organizations',
  },
];

const adminMenuItems = [
  {
    name: 'Add event',
    icon: <CampaignIcon />,
    path: '/admin/addevent',
  },
  {
    name: 'Add organization',
    icon: <GroupsIcon />,
    path: '/admin/addorganization',
  },
];

const Menu = () => {
  const [open, setOpen] = useState(true);
  const organizations = useSelector(
    (state: RootState) => state.user.user?.organizationsObj,
  );

  const handleClick = () => {
    setOpen(!open);
  };

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
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FactCheckOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Current organization" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" sx={{ pl: 2 }} disablePadding>
          {organizations?.map(({ title, logoUrl }, index) => (
            <ListItem key={title + index.toString()} disablePadding>
              <ListItemButton>
                <Avatar src={logoUrl} sx={{ mr: 1 }} />
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
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

  const userState = useSelector((state: RootState) => state.user.status);
  if (userState !== LoadStatus.SUCCEEDED) return null;
  return (
    <>
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
          {adminMenuItems.map(({ name, icon, path }, index) => (
            <ListItem key={name + index.toString()} disablePadding>
              <Link href={path} passHref>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default Menu;
