import { useSelector } from "react-redux";
import EditAccountTemplate from "../../Templates/EditAccountTemplate/EditAccount.template";
import { useEffect } from "react";

const EditAccountPage = () => {
  const { user } = useSelector((state) => state.user);
  return <EditAccountTemplate user={user} />;
};

export default EditAccountPage;
