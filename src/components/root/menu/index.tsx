import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Campaign as CampaignIcon,
  ExpandLess,
  ExpandMore,
  Group as GroupIcon,
  GroupAdd as GroupAddIcon,
} from "@mui/icons-material";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    name: "Events",
    icon: <CampaignIcon />,
    path: "events",
  },
  {
    name: "Speakers",
    icon: <GroupIcon />,
    path: "speakers",
  },
  {
    name: "Moderators",
    icon: <InterpreterModeIcon />,
    path: "moderators",
  },
];

const adminMenuItems = [
  {
    name: "Add event",
    icon: <CampaignIcon />,
    path: "admin/addevent",
  },
  {
    name: "Add speaker",
    icon: <GroupAddIcon />,
    path: "admin/addspeaker",
  },
];

const Menu = () => {
  const [open, setOpen] = useState(true);

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
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" sx={{pl: 2}} disablePadding>
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
    </List>
  );
};

export default Menu;
