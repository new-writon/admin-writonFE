import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

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
