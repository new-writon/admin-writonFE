import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getAuthCheckAPI } from "../apis/authAPI";

const HomePage = () => {
  const navigate = useNavigate();

  const { mutateAsync: checkAuth, isPending } = useMutation({
    mutationFn: () => getAuthCheckAPI(),
    onSuccess: () => {
      navigate("/challenge/dashboard");
    },
    onError: () => {
      navigate("/login");
    },
  });

  useEffect(() => {
    checkAuth();
  }, []);

  return <></>;
};

export default HomePage;
