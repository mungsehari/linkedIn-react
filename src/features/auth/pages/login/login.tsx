import { FormEvent, useState } from "react";

import classes from "./login.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import Box from "../../components/box/box";
import Input from "../../components/input/input";
import Seperator from "../../components/seperator/seperator";
import Button from "../../components/botton/botton";
import { useAuth } from "../../contexts/auth-context-provider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const doLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      await login(email, password);
      const destination = location.state?.from || "/";
      navigate(destination);
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
    setIsLoading(false);
  };
  return (
    <Layout>
      <div className={classes.root}>
        <Box>
          <h1>Sign in</h1>
          <p>Stay updated on your professional world.</p>
          <form action="" onSubmit={doLogin}>
            <Input
              label="Email"
              type="email"
              id="email"
              onFocus={() => setErrorMessage("")}
            />
            <Input
              label="Password"
              type="password"
              id="password"
              onFocus={() => setErrorMessage("")}
            />
            {errorMessage && <p className={classes.error}>{errorMessage}</p>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "..." : "Sign in"}
            </Button>
            <Link to="/request-password-reset">Forgot password?</Link>
          </form>
          <Seperator>Or</Seperator>
          <div className={classes.register}>
            New to LinkedIn? <Link to="/signup">Join now</Link>
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Login;
