import { DeleteIcon, EditIcon } from "../../../../utils/IconsSrc";

import classNames from "classnames";
import { useNavigate } from "react-router";
import { withTranslation } from "react-i18next";
import { useState } from "react";
import Modal from "../../../Organisms/Common/Modal";
import Button from "../../../Atoms/Buttons/Button";

const ApplicantCard = ({
  medicalIssues,
  applicantName,
  schoolName,
  educationLevel,
  address,
  medicalIssueDescripion,
  id,
  deleteApplicant,
  t,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const Data = [
    { title: t("applicantsData.Applicant Name"), value: applicantName },
    { title: t("applicantsData.School Name"), value: schoolName },
    { title: t("applicantsData.Educational Level"), value: educationLevel },
    {
      title: t("applicantsData.Health Issue"),
      value: medicalIssues.reduce(
        (accumlator, currentValue) => accumlator + currentValue.label + ", ",
        ""
      ),
    },
    {
      title: t("applicantsData.Health Issue Description"),
      value: medicalIssueDescripion,
    },
    {
      title: t("applicantsData.Home Address"),
      value: address
        ? `${address?.street_name}, ${address?.building_name}, ${address?.landmark}`
        : "No address",
    },
    {
      title: t("applicantsData.School Address"),
      value: "",
    },
  ];
  return (
    <>
      <div className="bg-[#FEF3E9] px-6 py-[25px] w-full h-min mb-7">
        <div className="space-y-6">
          {Data.map((title, i) => {
            return (
              <div className="sm:flex" key={title.title}>
                <h1 className="font-[AraHamahBold] text-[28px] text-lightgrey w-[40%]">
                  {title.title}
                </h1>

                <h1
                  className={classNames(
                    "font-[AraHamah1964] text-[28px] text-lightgrey w-full",
                    { "sm:ml-8 sm:rtl:mr-10": i === 0 }
                  )}
                >
                  {title.value}
                </h1>
                {i === 0 ? (
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <EditIcon
                      className="w-8 h-8 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/profile/my-account/applicants/edit-applicants/${id}`
                        )
                      }
                    />
                    <DeleteIcon
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {
        showModal ?
          <Modal
            showModal={showModal}
            setShowModal={() => setShowModal(!showModal)}
            modalClassName="!w-[616px] !min-h-[185px] pb-8 px-10"
          >
            <p className="text-[36px] my-[30px] text-[#525252]">
              {t("applicantsData.Delete Confirm")}
            </p>
            <div className="flex justify-end gap-[24px]">
              <Button
                name={t("general.Cancel")}
                buttonNameStyle={
                  "text-[24px]  border border-2 border-red-500 text-red-500 !px-[27px] h-[46px]"
                }
                onClick={() => setShowModal(false)}
              />
              <Button
                name={t("general.delete")}
                buttonNameStyle={
                  "bg-red-500  hover:bg-red-700 text-white text-[24px] !px-[27px] h-[46px]"
                }
                onClick={() => deleteApplicant(id)}
              />
            </div>
          </Modal>
        : null
      }
    </>
  );
};

export default withTranslation()(ApplicantCard);
