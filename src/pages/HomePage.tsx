import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      navigate("/challenge/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <></>;
};

export default HomePage;
