import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../apis/Axios";

const HomePage = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      await Axios.get("/auth/check");
      navigate("/challenge/dashboard");
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <></>;
};

export default HomePage;
