import { useDispatch, useSelector } from "react-redux";

import HomeTemplate from "../../Templates/HomeTemplate/Home.template";
import { listPackagesRequest } from "../../../Services/modules/packages";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packages.packages);
  const packagesLoading = useSelector((state) => state.packages.load.isLoading);
  // console.log(packagesLoading);
  useEffect(() => {
    dispatch(listPackagesRequest());
  }, []);

  return (
    <HomeTemplate
      packagesLoading={packagesLoading}
      packages={packages?.packages}
    />
  );
};

export default HomePage;
