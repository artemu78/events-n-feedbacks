import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface ToolbarCustomProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const ToolbarCustom = ({ handleDrawerOpen, open }: ToolbarCustomProps) => {
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
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Events and feedbacks
      </Typography>
      <Link href="signin" passHref>
        <Button color="inherit" startIcon={<LoginIcon />} sx={{ mr: 2 }}>
          Sign In
        </Button>
      </Link>
      <Link href="signup" passHref>
        <Button color="inherit" startIcon={<PersonAddIcon />}>
          Sign Up
        </Button>
      </Link>
    </Toolbar>
  );
};

export default ToolbarCustom;
