import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Accounts from '../components/Accounts'
import AccountHoldings from '../components/AccountHoldings';
import HoldingTransactions from '../components/HoldingTransactions';
import HomepageComponent from '../components/HomePageComponent';
import Layout from './Layout';
import Splash from '../components/Splash';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomepageComponent />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/accounts",
        element: <Accounts />
      },
      {
        path: "accounts/:accountId/accountholdings",
        element: <AccountHoldings />
      },
      {
        path: "accounts/:accountId/accountholdings/:holdingId/accounttransactions",
        element: <HoldingTransactions />
      }
    ],
  },

]);
