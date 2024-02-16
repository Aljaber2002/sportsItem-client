import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { ReactNode } from "react";

import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state: RootState) => state.Auth);
  if (!accessToken) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default AuthLayout;
