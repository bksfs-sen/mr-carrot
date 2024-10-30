import { useSelector } from "react-redux";
import AccountTemplate from "../../Templates/AccountTemplate/Account.template";

const AccountPage = () => {
  const { user } = useSelector((state) => state.user);

  return <AccountTemplate user={user} />;
};

export default AccountPage;
