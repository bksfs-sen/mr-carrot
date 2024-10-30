import { Outlet, useNavigate } from "react-router-dom";

import Button from "../../Atoms/Buttons/Button";
import PackageCard from "../../Molecules/Common/PackageCard";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";

const CartTemplate = ({ order, t }) => {
  const navigate = useNavigate();
  return (
    <>
      <main className=" w-full my-12">
        <section className="sm:flex bg-[#FEF3E9] font-[AraHamah1964] lg:px-[8.3%] py-10 sm:space-x-10 rtl:space-x-reverse">
          <div className="min-w-fit my-10 sm:my-0 px-0">
            {order && <PackageCard item={order?.package} />}
          </div>

          <div className="px-6 sm:px-0 w-full">
            <Outlet />
          </div>
        </section>
        <div className="flex justify-center my-20 space-x-4 rtl:space-x-reverse ">
          {order && (
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                name={t("applicantForm.Back")}
                buttonNameStyle={
                  "bg-white border-2 border-lime-400 text-lime-400 font-[AraHamahBold] text-[30px] !w-[177px]"
                }
                onClick={() => navigate(-1)}
              />
              <Button
                name={t("pagination.checkout")}
                buttonNameStyle={
                  "!px-0 !w-[177px] bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px]"
                }
                onClick={
                  order?.sub_orders.length > 0
                    ? () => window.location.assign("/checkout")
                    : () => toast.error("Please add an applicant to your order")
                }
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default withTranslation()(CartTemplate);
