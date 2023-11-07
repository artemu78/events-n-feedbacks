import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";

const menuItems = [
  {
    name: "Events",
    icon: <CampaignIcon />,
    path: "events"
  },
  {
    name: "Speakers",
    icon: <GroupIcon />,
    path: "speakers"
  },
  {
    name: "Moderators",
    icon: <InterpreterModeIcon />,
    path: "moderators"
  },
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
    </List>
  );
};

export default Menu;
