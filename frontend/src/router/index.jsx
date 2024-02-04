import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Accounts from "../components/Accounts";
import AccountHoldings from "../components/AccountHoldings";
import AccountTransactions from "../components/AccountTransactions";
import HomepageComponent from "../components/HomePageComponent";
import Splash from "../components/Splash";
import Layout from "./Layout";
import LoginFormModal from "../components/LoginFormModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Splash /> },
      { path: "homepage", element: <HomepageComponent /> },
      { path: "login", element: <LoginFormModal /> },
      { path: "signup", element: <SignupFormPage /> },
      { path: "accounts", element: <Accounts /> },
      {
        path: "accounts/:accountId/accountholdings",
        element: <AccountHoldings />,
      },
      {
        path: "accounts/:accountId/accountholdings/:holdingId/accounttransactions",
        element: <AccountTransactions />,
      },
    ],
  },
]);
