import AboutUsPage from "./Components/Pages/AboutUsPage/AboutUs.page";
import AccountPage from "./Components/Pages/AccountPage/Account.page";
import AddApplicantsPage from "./Components/Pages/AddApplicantsPage/AddApplicants.page";
import AddApplicantsTemplate from "./Components/Templates/AddApplicantsTemplate/AddApplicants.template";
import ApplicantForm from "./Components/Organisms/Applicants/ApplicantForm/ApplicantForm";
import ApplicantsPage from "./Components/Pages/ApplicantsPage/Applicants.page";
import CartAddApplicantPage from "./Components/Pages/CartAddApplicantPage/CartAddApplicant.page";
import CartPage from "./Components/Pages/CartPage/Cart.page";
import CheckoutPage from "./Components/Pages/CheckoutPage/Checkout.page";
import ChooseApplicantsPage from "./Components/Pages/ChooseApplicantsPage/ChooseApplicants.page";
import ContactUsPage from "./Components/Pages/ContactUsPage/ContactUs.page";
import CurrentOrdersPage from "./Components/Pages/CurrentOrdersPage/CurrentOrders.page";
import EditAccountPage from "./Components/Pages/EditAccountPage/EditAccount.page";
import EditApplicantPage from "./Components/Pages/EditApplicantPage/EditApplicant.page";
import HistoricalOrdersPage from "./Components/Pages/HistoricalOrdersPage/HistoricalOrders.page";
import HomePage from "./Components/Pages/HomePage/Home.page";
import Layout from "./Components/Organisms/Layout/Layout";
import { Navigate } from "react-router";
import NewPasswordPage from "./Components/Pages/NewPasswordPage/NewPassword.page";
import NotificationPage from "./Components/Pages/NotificationPage/Notification.page";
import ProfilePage from "./Components/Pages/ProfilePage/Profile.page";
import RateOrderPage from "./Components/Pages/RateOrderPage/RateOrder.page";
import SigninPage from "./Components/Pages/SigninPage/Signin.page";
import SignupPage from "./Components/Pages/SignUpPage/Signup.page";
import SubscriptionConfirmPage from "./Components/Pages/SubscriptionConfirmPage/SubscriptionConfirm.page";
import VerificationPage from "./Components/Pages/Verificationpage/Verification.page";
import ForgotPasswordPage from "./Components/Pages/ForgotPasswordPage/ForgotPassword.page";

export const routes = [
  // { name: "Sign up", path: "/signup", exact: true, element: <SignupPage /> },
  // { name: "Sign in", path: "/signin", exact: true, element: <SigninPage /> },
  // {
  //   name: "Verification",
  //   path: "/verify",
  //   exact: true,
  //   element: <VerificationPage />,
  // },
  // {
  //   name: "NewPassword",
  //   path: "/resetpassword",
  //   exact: true,
  //   element: <NewPasswordPage />,
  // },
  // {
  //   name: "Verification",
  //   path: "/verify",
  //   exact: true,
  //   element: <VerificationPage />,
  // },
  // {
  //   name: "sendMessage",
  //   path: "/sendMessage",
  //   exact: true,
  //   element: <SendMessagePage />,
  // },
  {
    name: "Home",
    path: "/",
    exact: true,
    element: <HomePage />,
  },
  {
    name: "About",
    path: "/about",
    exact: "true",
    element: <AboutUsPage />,
  },
  {
    name: "Conatct us",
    path: "/contact",
    exact: "true",
    element: <ContactUsPage />,
  },
  {
    name: "Notification",
    path: "/notification",
    exact: "true",
    element: <NotificationPage />,
  },
  {
    name: "Checkout",
    path: "/checkout",
    exact: "true",
    element: <CheckoutPage />,
  },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    element: <ProfilePage />,
    children: [
      {
        name: "My Account",
        path: "/profile/my-account",
        children: [
          {
            name: "Add Applicants",
            path: "/profile/my-account/applicants/add-applicants",
            element: <AddApplicantsPage />,
          },
          {
            name: "Add Applicants",
            path: "/profile/my-account/applicants/edit-applicants/:id",
            element: <EditApplicantPage />,
          },
          {
            name: "Applicants",
            path: "/profile/my-account/applicants",
            element: <ApplicantsPage />,
          },
          {
            name: "Account",
            path: "/profile/my-account/account-setting",
            element: <AccountPage />,
          },
          {
            name: "Edit Account",
            path: "/profile/my-account/account-setting/edit",
            element: <EditAccountPage />,
          },
          {
            name: "Payment",
            path: "/profile/my-account/payment",
            element: <h1>Payment</h1>,
          },
        ],
      },
      {
        name: "My Orders",
        path: "/profile/my-orders",
        children: [
          {
            name: "Current Orders",
            path: "/profile/my-orders/current-orders",
            element: <CurrentOrdersPage />,
          },
          {
            name: "History",
            path: "/profile/my-orders/history",
            element: <HistoricalOrdersPage />,
          },
        ],
      },
    ],
  },
  // {
  //   name: "Page not found",
  //   path: "*",
  //   element: <h1>You are already logged in, please sign out first</h1>,
  // },
  {
    name: "Cart",
    path: "/cart",
    exact: true,
    element: <CartPage />,
    children: [
      {
        name: "Add Applicant Cart",
        path: "/cart/choose-applicants",
        element: <ChooseApplicantsPage />,
      },
      {
        name: "Add Applicant Cart",
        path: "/cart/add-applicant",
        element: <CartAddApplicantPage />,
      },
    ],
  },
  {
    name: "Subscription confirmed",
    path: "/sub-successful",
    element: <SubscriptionConfirmPage />,
  },
  {
    name: "Rate order",
    path: "/add-review/:id",
    element: <RateOrderPage />,
  },
];

export const authenticationRoutes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    name: "About",
    path: "/about",
    exact: "true",
    element: (
      <Layout>
        <AboutUsPage />
      </Layout>
    ),
  },
  {
    name: "Conatct us",
    path: "/contact",
    exact: "true",

    element: (
      <Layout>
        <ContactUsPage />
      </Layout>
    ),
  },
  { name: "Sign up", path: "/signup", exact: true, element: <SignupPage /> },
  { name: "Sign in", path: "/signin", exact: true, element: <SigninPage /> },
  {
    name: "Forget password",
    path: "/forgetPassword",
    exact: true,
    element: <ForgotPasswordPage />,
  },
  {
    name: "NewPassword",
    path: "/resetpassword",
    exact: true,
    element: <NewPasswordPage />,
  },
  { name: "Page not found", path: "*", element: <Navigate to="/signin" /> },
];
export const verifyRoutes = [
  {
    name: "Verification",
    path: "/verify",
    exact: true,
    element: <VerificationPage />,
  },
];
