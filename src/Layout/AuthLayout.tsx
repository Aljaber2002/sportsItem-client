import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state: RootState) => state.Auth);
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return accessToken ? <>{children}</> : null;
};

export default AuthLayout;
