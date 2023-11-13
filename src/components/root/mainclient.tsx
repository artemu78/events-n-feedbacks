"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Main from "@/components/root";
import { AppDispatch, RootState } from "@/store";
import { setUser } from "@/store/userslice";
import { User, UserState, UserStatus } from "@/types";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch: AppDispatch = useDispatch();
  const UserState = useSelector((state: RootState) => state.user.status);

  const loginUser = (user: User) => {
    dispatch(
      setUser({
        uid: user.uid,
        displayName: user.name || "",
        email: user.email,
        photoURL: user.picture || "",
      })
    );
  };

  const checkUserLogged = async () => {
    const response = await fetch("/api/auth");
    if (response.status === 200) {
      const user: UserState = await response.json();
      user.user && loginUser(user?.user);
    }
  };

  const [open, setOpen] = useState(true);
  useEffect(() => {
    console.log(
      `demo-app web version ${process.env.NEXT_PUBLIC_REACT_APP_VERSION}`
    );
    if (UserState === UserStatus.IDLE) checkUserLogged();
  }, []);

  return (
    <Main open={open} setOpen={setOpen}>
      {children}
    </Main>
  );
}
