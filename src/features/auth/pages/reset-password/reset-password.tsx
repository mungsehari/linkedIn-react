import { useState } from "react";
import classes from "./reset-password.module.scss";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import Box from "../../components/box/box";
import Input from "../../components/input/input";
import Button from "../../components/botton/botton";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendPasswordResetToken = async (email: string) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/auth/send-password-reset-token?email=${email}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setErrorMessage("");
        setEmailSent(true);
        return;
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/auth/reset-password?email=${email}&token=${code}&newPassword=${password}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setErrorMessage("");
        navigate("/login");
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  return (
    <Layout>
      <div className={classes.root}>
        <Box>
          <h1>Reset Password</h1>

          {!emailSent ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                const email = e.currentTarget.email.value;
                await sendPasswordResetToken(email);
                setEmail(email);
                setIsLoading(false);
              }}
            >
              <p>
                Enter your email and we’ll send a verification code if it
                matches an existing LinkedIn account.
              </p>
              <Input key="email" name="email" type="email" label="Email" />
              <p style={{ color: "red" }}>{errorMessage}</p>
              <Button type="submit" disabled={isLoading}>
                Next
              </Button>
              <Button
                outline
                onClick={() => {
                  navigate("/");
                }}
                disabled={isLoading}
              >
                Back
              </Button>
            </form>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                const code = e.currentTarget.code.value;
                const password = e.currentTarget.password.value;
                await resetPassword(email, code, password);
                setIsLoading(false);
              }}
            >
              <p>
                Enter the verification code we sent to your email and your new
                password.
              </p>
              <Input
                type="text"
                label="Verification code"
                key="code"
                name="code"
              />
              <Input
                label="New password"
                name="password"
                key="password"
                type="password"
                id="password"
              />
              <p style={{ color: "red" }}>{errorMessage}</p>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : "Reset Password"}
              </Button>
              <Button
                outline
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setEmailSent(false);
                }}
                disabled={isLoading}
              >
                {isLoading ? "..." : "Back"}
              </Button>
            </form>
          )}
        </Box>
      </div>
    </Layout>
  );
};

export default ResetPassword;
