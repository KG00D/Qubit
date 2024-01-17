import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Accounts from '../components/Accounts'
import AccountDetails from '../components/AcccountDetails';
import AssetHoldings from '../components/AssetHoldings';
// import AssetTransactions from '../components/AssetTransactions';
import Layout from './Layout';
import Splash from '../components/Splash';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
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
        path: "accounts/:id", 
        element: <AccountDetails />
      },
      {
        path: "accounts",
        element: <Accounts />
      },
      {
        path: "assetholdings/:accountId",
        element: <AssetHoldings />
      }
      // ,
      // {
      //   path: "assettransactions/:holdingId",
      //   element: <AssetTransactions />
      // }
    ],
  },

]);
