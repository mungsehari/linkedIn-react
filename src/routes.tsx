import { createBrowserRouter } from "react-router-dom";
import FeedPage from "./features/feed/pages/feed-page";

import AuthContextProvider from "./features/auth/contexts/auth-context-provider";
import Login from "./features/auth/pages/login/login";
import Signup from "./features/auth/pages/signup/signup";
import ResetPassword from "./features/auth/pages/reset-password/reset-password";
import VerifyEmail from "./features/auth/pages/verify-email/verify-email";

const router = createBrowserRouter([
  {
    element: <AuthContextProvider />,
    children: [
      {
        path: "/",
        element: <FeedPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/request-password-reset",
        element: <ResetPassword />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "*",
        element: "NotFound",
      },
    ],
  },
]);

export default router;
