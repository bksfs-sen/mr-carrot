import classNames from "classnames";
import { useEffect } from "react";

const Modal = ({ setShowModal, showModal, children, modalClassName }) => {
  
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && showModal === true) {
      setShowModal(!showModal);
    }
  })

  // useEffect(() => {
  //   const closeModal = (event) => {
  //     if (event.key === "Escape") setShowModal(!showModal);
  //   };
  //   window.addEventListener("keydown", (event) => closeModal(event));
  //   return window.removeEventListener("keydown", (event) => closeModal(event));
  // }, [showModal]);
  return (
    <>
      {showModal ? (
        <div
          // onClick={() => setShowModal(!showModal)}
          className="fixed top-0 left-0 right-0 z-50  w-full  overflow-x-hidden overflow-y-auto md:inset-0 h-modal  flex justify-center items-center  bg-[#323232]/50 h-full"
        >
          <div
            className={classNames(
              "relative  w-[963px] m-2  max-h-[90vh] overflow-y-scroll  max-w-7xl  bg-white rounded-xl shadow px-2 sm:px-8  xl:pb-8",
              modalClassName
            )}
          >
            <div
              className={`top-6 ${localStorage.getItem("language") === "ar" ? "leftt-0 mr-auto" : "right-0 ml-auto"} w-[24px] h-[24px] flex items-center justify-center bg-white	rounded-2xl text-3xl sticky cursor-pointer hover:text-red-600 hover:text-4xl hover:w-[36px] hover:h-[36px]`}
              onClick={() => setShowModal(!showModal)}
            >
              X
            </div>
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
