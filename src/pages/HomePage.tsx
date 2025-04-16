import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getAuthCheckAPI } from "../apis/authAPI";
import { Loading } from "../components/atoms";

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

  return (
    <>
      {isPending && (
        <Loading text="잠시만 기다려주세요..." hasBackdrop={false} />
      )}
    </>
  );
};

export default HomePage;
