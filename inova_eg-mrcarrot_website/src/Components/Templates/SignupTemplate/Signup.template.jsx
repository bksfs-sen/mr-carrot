import AuthenticationLayout from "../../Organisms/Layout/AuthenticationLayout";
import SignupForm from "../../Organisms/Signup/SignupForm/SignupForm";
import { withTranslation } from "react-i18next";

const SignupTemplate = ({ t }) => {
  return (
    <AuthenticationLayout
      title={t("signupPage.title")}
      subTitle={t("signupPage.subTitle")}
      link={"/signin"}
      linkText={t("signupPage.link")}
    >
      <SignupForm />
    </AuthenticationLayout>
  );
};

export default withTranslation()(SignupTemplate);

// <main className="grid grid-cols-12 h-screen">
//   <section className="col-span-4  max-h-screen sm:flex hidden ">
//     <img src={ImagesSrc.AuthImage} />
//   </section>
//   <section className="sm:col-span-8 col-span-12 px-[5%] pt-10">
//     <div>
//       <div className="flex justify-end">
//         <Link to="/signin">
//           <p className="text-orange underline underline-offset-8 text-[26px] font-[AraHamah1964]">
//             Sign in
//           </p>
//         </Link>
//       </div>
//       <AuthenticationHeader
//         title={"Welcome to Mr. Carrot!"}
//         subTitle={"Register your account"}
//       />
//       <SignupForm t={t} />
//     </div>
//   </section>
// </main>
