"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import dynamic from "next/dynamic";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (user == null) {
    if (pathname.includes("/signup")) {
      const SignUpPage = dynamic(() => import("@/app/signup/page"), {
        ssr: false,
      });
      return <SignUpPage />;
    }
    const LoginPage = dynamic(() => import("@/app/login/page"), { ssr: false });
    return <LoginPage />;
  }
  if (user) {
    router.push("/");
  }
  return children;
}

export default ProtectedRoute;
