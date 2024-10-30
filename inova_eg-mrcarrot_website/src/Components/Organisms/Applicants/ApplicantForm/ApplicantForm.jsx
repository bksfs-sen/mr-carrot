import {
  addApplicantRequest,
  editApplicantRequest,
} from "../../../../Services/modules/applicants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import { AddApplicantSchema } from "./validation";
import Button from "../../../Atoms/Buttons/Button";
import { DropdownSelect } from "../../../Atoms/DropdownSelect/DropdownSelect";
import { Link, useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "../../../Atoms/LoadingSpinner/LoadingSpinner";
import Textfield from "../../../Atoms/Textfields/Textfield";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { withTranslation } from "react-i18next";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MyMapComponent } from "../../../Atoms/Map/map";
// import ReactGoogleAutocomplete from "react-google-autocomplete";
import Autocomplete from "react-google-autocomplete";
import { toast } from "react-toastify";
import { InitMapComponent } from "../../../Atoms/Map/InitMapComponent";

const ApplicantForm = ({
  t,
  schools,
  edit,
  applicantData,
  educationalLevels,
  healthIssues,
  cart,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.applicant.load);
  const { id } = useParams();

  // const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
  };


  

  // const [location, setLocation] = useState({
  //   lat: -34.397, lng: 150.644,

  //   // lat: 41.3851, lng: 2.1734
  // });

  const formik = useFormik({
    initialValues: {
      name: "",
      school: "",
      education_level: "",
      medical_issues: "",
      medical_issue_description: "",
      medical_issue_check: false,
      address: {
        region_id: "",
        street_name: "",
        building_name: "",
        landmark: "",
      },
      location: {
        lat: 0,
        lng: 0
      }
    },
    validationSchema: AddApplicantSchema,
    onSubmit: async (values) => {
      if (edit) {
        const medical_issues_ids = await values?.medical_issues?.map(
          (issue) => issue?.value
        );

        await dispatch(
          editApplicantRequest(
            {
              applicant: {
                main_attributes: {
                  school_id: values.school.value,
                  name: values.name,
                  education_level: values.education_level.value,
                  medical_issue_description: values.medical_issue_description,
                },
                medical_issues: {
                  medical_issue_ids: medical_issues_ids,
                },
                address: {
                  region_id: String(values.address.region_id),
                  street_name: values.address.street_name,
                  building_name: values.address.building_name,
                  landmark: values.address.landmark,
                },
                location: {
                  lat: values.location.lat,
                  lng: values.location.lng,
                }
              },
            },
            id
          )
        );

        navigate("/profile/my-account/applicants");
      } else {
        // handle if not select location from map error here (use it on add location btn)
        console.log('location', formik.values.location.lat , formik.values.location.lng)
        if(formik.values.location.lat === 0 || formik.values.location.lng === 0){
          toast.error("Please select location");
        }else{
          toast.info(
            `now location lat: ${formik.values.location.lat} , lng: ${formik.values.location.lng}`
          )
          const medical_issues_ids = await values?.medical_issues?.map(
            (issue) => issue?.value
          );
  
          await dispatch(
            addApplicantRequest({
              applicant: {
                main_attributes: {
                  school_id: values.school.value,
                  name: values.name,
                  education_level: values.education_level.value,
                  medical_issue_description: values.medical_issue_description,
                },
                medical_issues: {
                  medical_issue_ids: medical_issues_ids,
                },
                address: {
                  region_id: Number(values.address.region_id),
                  street_name: values.address.street_name,
                  building_name: values.address.building_name,
                  landmark: values.address.landmark,
                },
                location: {
                  lat: values.location.lat,
                  lng: values.location.lng,
                }
              },
            })
          );
          if (pathname.includes("cart")) {
            navigate("/cart/choose-applicants");
          } else {
            navigate("/profile/my-account/applicants");
          }
        }
      }
    },
  });

  const [markerOrAutoCompletePosition, setMarkerOrAutoCompletePosition] = useState(formik.values.location);

  const getCurrentLocation = (lat, lng) => {
    // setLocation({
    //   lat: lat,
    //   lng: lng,
    // });
    // formik.setFieldValue(location.lat, applicantData?.lat);
    // formik.setFieldValue(location.lng, applicantData?.lng);
    formik.setFieldValue("location", {
      lat: lat,
      lng: lng
    });
  };

  // console.log('location', location);


  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);  
  const [center, setCenter] = useState({
    // lat: "",
    // lng: "",
    // lat: "-34.397",
    // lng: "150.644",
    lat: -34.397, lng: 150.644,
    // lat: 41.3851, lng: 2.1734
  });
  /*const onDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setUserLat(lat);
    setUserLng(lng);
    // setCenter({ lat, lng });
  };

  const defaultProps = {
    center: {
      lat: 2.3507744060959697,
      lng: 2.3507744060959697,
    },
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
    zoom: 10,
  };
  function getLocationhi() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionby);
    } else {
    }
  }

  function showPositionby(position) {
    getCurrentLocation(position.coords.latitude, position.coords.longitude);
  }
  useEffect(() => {
    if (!lat && !lng) {
      getLocationhi();
    }
  }, [lat, lng]);*/

  const getSearchLocation = (place) => {
    setUserLat(place.geometry.location.lat());
    setUserLng(place.geometry.location.lng());
  };

  // useEffect(() => {
  //   setCenter({
  //     lat: userLat,
  //     lng: userLng,
  //   });
  //   // if (type === "add") 
  //   getCurrentLocation(userLat, userLng);
  // }, [userLat, userLng]);

  // useEffect(() => {
  //   if (lat !== null) {
  //     setUserLat(lat);
  //     setUserLng(lng);
  //     getCurrentLocation(lat, lng);
  //   }
  // }, [lat, lng]);
  
  const mapKey = "AIzaSyBxFCHeTttOlo-2nO_eWFT84wNBiRszTM0";


  useEffect(() => {
    const fields = [
      "name",
      // "education_level",
      "medical_issue_description",
      "address",
      "medical_issues",
    ];
    if (applicantData) {
      fields.forEach((field) =>
        formik.setFieldValue(field, applicantData[field])
      );
      formik.setFieldValue("school", {
        label: applicantData?.school_name,
        value: applicantData?.school_id,
      });
      formik.setFieldValue("education_level", {
        label: applicantData?.education_level,
        value: applicantData?.education_level_id,
      });
      // setLocation({
      //   lat: applicantData?.lat,
      //   lng: applicantData?.long,
      // });
      formik.setFieldValue("location", {
        lat: applicantData?.lat,
        lng: applicantData?.lng
      });
    }
  }, [applicantData]);

  // useEffect(()=>{
  //   (formik.values.location.lat != 0 && formik.values.location.lng != 0) && toast.info(
  //     `now location lat: ${formik.values.location.lat} , lng: ${formik.values.location.lng}`
  //   )
  // },[formik.values.location])

  return (
    <div>
      <form className="bg-[#FEF3E9] p-8 mt-[20px]">
        <div className="">
          <Textfield
            placeholder={t("applicantForm.Applicant name")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
        <div className="space-y-8 mt-8">
          <DropdownSelect
            placeholder={t("applicantForm.School name")}
            options={schools}
            value={formik.values.school}
            onChange={(option) => formik.setFieldValue("school", option)}
            helperText={formik.touched.school && formik.errors.school}
          />
          <DropdownSelect
            placeholder={t("applicantForm.Educational level")}
            options={educationalLevels}
            value={formik.values.education_level}
            onChange={(option) =>
              formik.setFieldValue("education_level", option)
            }
            helperText={
              formik.touched.education_level && formik.errors.education_level
            }
          />
          <DropdownSelect
            placeholder={t("applicantForm.Health issue")}
            isMulti
            options={healthIssues}
            value={formik.values.medical_issues}
            onChange={(option) =>
              formik.setFieldValue("medical_issues", option)
            }
            helperText={
              formik.touched.medical_issues && formik.errors.medical_issues
            }
          />
        </div>
        <div className="font-[AraHamah1964] text-[18px]">
          <h1
            className={classNames("text-lightgrey", {
              "text-red-500":
                formik.errors.medical_issue_check &&
                formik.touched.medical_issue_check,
            })}
          >
            Mr. Carrot is not responsible for any medical issues chosen by the
            individual, and it is important to consult with a licensed medical
            professional before making any decisions regarding one's health.
          </h1>
          <div className="space-x-2 ">
            <input
              type="checkbox"
              checked={formik.values.medical_issue_check}
              onChange={() =>
                formik.setFieldValue(
                  "medical_issue_check",
                  !formik.values.medical_issue_check
                )
              }
            />
            <label>I accept the conditions</label>
          </div>
        </div>

        <textarea
          name="medical_issue_description"
          className="w-full h-28 mt-8 rounded-md resize-none px-4 pt-3 font-[AraHamah1964] placeholder:text-slate-400 text-[22px]"
          placeholder={t("applicantForm.Health Issue Description")}
          value={formik.values.medical_issue_description}
          onChange={formik.handleChange}
        />
        <h1 className=" text-[30px] text-lightgrey font-[AraHamahBold]">
          {t("applicantForm.Home Address")}
        </h1>
        <div className="w-[100%] flex flex-row gap-4 grow mt-6">
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Area")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black "
            }
            height="h-[46px]"
            width="w-full"
            name="address.region_id"
            value={formik?.values?.address?.region_id}
            onChange={formik.handleChange}
            //   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            //   helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Street Name")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="address.street_name"
            value={formik?.values?.address?.street_name}
            onChange={formik.handleChange}
            //   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            //   helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </div>
        <div className="w-[100%] flex flex-row gap-4 grow mt-6">
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Building name")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black "
            }
            height="h-[46px]"
            width="w-full"
            name="address.building_name"
            value={formik?.values?.address?.building_name}
            onChange={formik.handleChange}
            //   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            //   helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Landmark")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="address.landmark"
            value={formik?.values?.address?.landmark}
            onChange={formik.handleChange}
            //   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            //   helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </div>

        {/* <div className="w-[100%] h-[300px] relative mt-6">
          <div className="w-[40%] absolute top-[10px] left-[10px] z-[3] rounded-md shadow-sm border-2">
              <Autocomplete
                className="places-search block w-full h-full rounded-md border-gray-300 pl-7  focus:outline-orange focus:ring focus:ring-white sm:text-[22px]  text-white font-[AraHamah1964] placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
                apiKey={mapKey}
                onPlaceSelected={(place) => {
                  getSearchLocation(place);
                  // set here markerOrAutoCompletePosition with lat , lng from place
                }}
                placeholder="Search Location"            
              />
          </div>

          <button
            className="w-28 h-10 absolute bottom-[45px] top-[auto] right-[15px] z-[3] text-white rounded-lg flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c]"
            onClick={(e) => {
              e.preventDefault();
              // update getCurrentLocation with selected item from autoComplete select if need
              getCurrentLocation(markerOrAutoCompletePosition.lat, markerOrAutoCompletePosition.lng);
              console.log('location', formik.values.location)
              if(markerOrAutoCompletePosition.lat === 0 || markerOrAutoCompletePosition.lng === 0){
                toast.error("Please select location");
              }else{
                toast.info(
                  `now location lat: ${markerOrAutoCompletePosition.lat} , lng: ${markerOrAutoCompletePosition.lng}`
                )
              }
            }}              
          >
            Add location
          </button>

          <Wrapper
            apiKey="AIzaSyBxFCHeTttOlo-2nO_eWFT84wNBiRszTM0"
            render={render}
          >
            <InitMapComponent center={formik.values.location} setCenter={getCurrentLocation} zoom={zoom} mapHeight={"17rem"} 
              markerOrAutoCompletePosition={markerOrAutoCompletePosition} setMarkerOrAutoCompletePosition={setMarkerOrAutoCompletePosition}
            />
          </Wrapper>
        </div> */}
        {/* <h1 className="mt-8 text-[30px] text-lightgrey font-[AraHamahBold]">
          {t("applicantForm.School Address")}
        </h1>
        <div className="w-[100%] flex flex-row gap-4 grow mt-6">
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Area")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black "
            }
            height="h-[46px]"
            width="w-full"
            name="school_address.area"
            value={formik.values.school_address.area}
            onChange={formik.handleChange}
            //   value={formik.values.first_name}
            //   onChange={formik.handleChange}
            //   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            //   helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Street Name")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="school_address.street_name"
            value={formik.values.school_address.street_name}
            onChange={formik.handleChange}
            //   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            //   helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </div>
        <div className="w-[100%] flex flex-row gap-4 grow mt-6">
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Building name")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black "
            }
            height="h-[46px]"
            width="w-full"
            name="school_address.building_name"
            value={formik.values.school_address.building_name}
            onChange={formik.handleChange}
            //   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            //   helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <Textfield
            margin="w-[50%]"
            placeholder={t("applicantForm.Landmark")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="school_address.landmark"
            value={formik.values.school_address.landmark}
            onChange={formik.handleChange}
            //   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            //   helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </div> */}
      </form>
      {isLoading ? (
        <LoadingSpinner />
      ) : cart ? (
        <div className="flex justify-end px-10">
          <h1
            onClick={formik.handleSubmit}
            className="text-[32px] font-bold text-lime-400 cursor-pointer"
          >
            Save
          </h1>
        </div>
      ) : (
        <div className="flex justify-center my-20 space-x-4 rtl:space-x-reverse">
          <Button
            name={t("applicantForm.Back")}
            buttonNameStyle={
              "bg-white border-2 border-lime-400 text-lime-400 font-[AraHamahBold] text-[30px] !w-[177px]"
            }
            onClick={() => navigate(-1)}
          />
          <Button
            name={t("applicantForm.Save")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] !w-[177px]"
            }
            onClick={formik.handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default withTranslation()(ApplicantForm);
