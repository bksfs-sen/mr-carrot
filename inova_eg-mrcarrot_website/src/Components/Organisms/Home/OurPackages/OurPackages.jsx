import { Arrow, InactiveArrow } from "../../../../utils/IconsSrc";
import { useDispatch, useSelector } from "react-redux";

import PackageCard from "../../../Molecules/Common/PackageCard";
import { addOrderRequest } from "../../../../Services/modules/orders";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePagination } from "../../../../Hooks/usePagination";
import { useState } from "react";
import { useAuth } from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../Atoms/LoadingSpinner/LoadingSpinner";

export const OurPackages = ({ t, packages, packagesLoading }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subscribeToPackage = async (id) => {
    if (auth) {
      await dispatch(addOrderRequest({ order: { package_id: id } }));
      navigate("/cart/choose-applicants");
    } else {
      toast.warning(t("toaster.packageSubscription"));
      navigate("/signin");
    }
  };

  const { pages } = usePagination(packages, itemsPerPage);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 900 && window.innerWidth > 750) {
        setCurrentPage(0);
        setItemsPerPage(2);
      } else if (window.innerWidth < 750) {
        setCurrentPage(0);
        setItemsPerPage(1);
      } else {
        setCurrentPage(0);
        setItemsPerPage(3);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 900 && window.innerWidth > 750) {
          setItemsPerPage(2);
        } else if (window.innerWidth < 750) {
          setItemsPerPage(1);
        } else {
          setItemsPerPage(3);
        }
      });
    };
  }, []);
  return (
    <section className="font-[AraHamah1964] text-lightgrey">
      <div className="text-center">
        <h1 className="text-[50px] font-[AraHamahBold]">
          {t("packages.title")}
        </h1>
        <p className="text-[32px]">{t("packages.subTitle")}</p>
      </div>
      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[40px] gap-y-7 mt-8"> */}
      {packagesLoading ? (
        <LoadingSpinner spinnerStyle="h-full items-center mt-5" />
      ) : (
        <>
          <div className="flex lg:flex-row flex-col lg:space-x-[20px] gap-y-5 lg:gap-y-0 justify-between  mt-8">
            {pages &&
              pages[currentPage]?.map((item, i) => {
                return (
                  <PackageCard
                    item={item}
                    key={i}
                    subscribeToPackage={subscribeToPackage}
                    showButton={true}
                  />
                );
              })}
          </div>
          <div className="flex justify-center space-x-10 rtl:space-x-reverse mt-10">
            {currentPage === 0 ? (
              <InactiveArrow className="cursor-pointer rtl:rotate-180" />
            ) : (
              <Arrow
                onClick={() => setCurrentPage(currentPage - 1)}
                className="ltr:rotate-180 cursor-pointer "
              />
            )}
            {currentPage === pages?.length - 1 ? (
              <InactiveArrow className="ltr:rotate-180 cursor-pointer" />
            ) : (
              <Arrow
                onClick={() => setCurrentPage(currentPage + 1)}
                className="cursor-pointer rtl:rotate-180"
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};
