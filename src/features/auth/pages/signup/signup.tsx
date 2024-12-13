import { Link, useNavigate } from "react-router-dom";
import Botton from "../../components/botton/botton";
import classes from "./signup.module.scss";
import { FormEvent, useState } from "react";
import Layout from "../../components/layout/layout";
import Box from "../../components/box/box";
import Input from "../../components/input/input";
import Seperator from "../../components/seperator/seperator";
import { useAuth } from "../../contexts/auth-context-provider";
const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const doSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={classes.root}>
      <Layout>
        <Box>
          <h1>Sign up</h1>
          <p>Make the most of your professional life</p>
          <form action="" onSubmit={doSignup}>
            <Input
              type="email"
              label="Email"
              size="large"
              name="email"
              onFocus={() => setErrorMessage("")}
            />
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              onFocus={() => setErrorMessage("")}
            />
            {errorMessage && <p className={classes.error}>{errorMessage}</p>}
            <p className={classes.disclaimer}>
              By clicking Agree & Join or Continue, you agree to LinkedIn's{" "}
              <a href="">User Agreement</a>, <a href="">Privacy Policy</a>, and{" "}
              <a href="">Cookie Policy</a>.
            </p>
            <Botton type="submit" disabled={isLoading}>
              Agree & Join
            </Botton>
          </form>
          <Seperator>Or</Seperator>
          <div className={classes.register}>
            Already on LinkedIn? <Link to="/login">Sign in</Link>
          </div>
        </Box>
      </Layout>
    </div>
  );
};

export default Signup;
