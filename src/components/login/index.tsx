"use client";
import {
  Close as CloseIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {  } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/services/firebase-config";

interface LoginProps {
  title: string;
}

const Login = ({ title }: LoginProps) => {
  const router = useRouter();
  return (
    <Dialog
      onClose={() => router.back()}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Button color="inherit" fullWidth startIcon={<GoogleIcon />} sx={{ my: 2 }}>
          Google
        </Button>
        <Button color="inherit" fullWidth startIcon={<FacebookIcon />} sx={{ my: 2 }}>
          Facebook
        </Button>
        <Button color="inherit" fullWidth startIcon={<TwitterIcon />} sx={{ my: 2 }}>
          Twitter
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
