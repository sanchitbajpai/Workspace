import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
