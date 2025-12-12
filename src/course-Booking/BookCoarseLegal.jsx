// BookCoarseLegal.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-toastify";
import axios from "../api/axios";

const BookCoarseLegal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courses = location.state?.course;
  const courseId = courses?.id || "";
  const courseCost = courses?.fees || "";
  const courseName = courses?.name || "";

  const userId = localStorage.getItem("user_id");
  const usertoken = localStorage.getItem("token");

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    const defaultData = {
      terms: "no",
      // Include all possible fields with defaults
      title: "",
      surname: "",
      firstname: "",
      preferName: "",
      email: "",
      diet: "",
      company: "",
      organisation: "",
      levelOrg: "",
      sector: "",
      nationality: "",
      job: "",
      gender: "",
      population: "",
      passport: "",
      finding: "",
      physicallyDisabled: "",
      nature: "",
      internationalMobilePhone: "",
      account: "",
      country: "",
      postalAd_1: "",
      postalAd_2: "",
      city: "",
      organisationBilling: "",
      division: "",
      billing_province: "",
      billing_postalcode: "",
      zip_code: "",
      vatNumber: "",
      division_on_the_invoice: "",
      sendingEmail: "",
    };

    return savedData
      ? { ...defaultData, ...JSON.parse(savedData) }
      : defaultData;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form when terms change
  useEffect(() => {
    setIsFormValid(formData.terms === "yes");
  }, [formData.terms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    let stepErrors = {};
    if (formData.terms !== "yes") {
      stepErrors.terms = "You must accept the terms and conditions to continue";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      // Create payload with correct field names
      const payload = {
        user_id: userId,
        course_id: courseId,
        course_amount: courseCost,
        title: formData.title,
        surname: formData.surname,
        firstname: formData.firstname,
        prefered_name: formData.preferName,
        email: formData.email,
        diet: formData.diet,
        company: formData.company,
        function_organisation: formData.organisation,
        level_organisation: formData.levelOrg,
        sector: formData.sector,
        nationality: formData.nationality,
        job_title: formData.job,
        gender: formData.gender,
        population_group: formData.population,
        name_to_appear: formData.passport,
        here_about_us: formData.finding,
        physically_disabled: formData.physicallyDisabled,
        nature_disability: formData.nature,
        international_mobile: formData.internationalMobilePhone,
        billing_account: formData.account,
        billing_country: formData.country,
        billing_address_one: formData.postalAd_1,
        billing_address_two: formData.postalAd_2,
        billing_city: formData.city,
        billing_organisation: formData.organisationBilling,
        billing_division: formData.division,
        billing_province: formData.billing_province,
        billing_postalcode: formData.billing_postalcode,
        billing_zipcode: formData.zip_code,
        billing_vat_number: formData.vatNumber,
        division_in_invoice: formData.division_on_the_invoice,
        email_for_invoice: formData.sendingEmail,
        accept_legal: formData.terms === "yes",
      };


      const response = await axios.post("store-course-booking", payload, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
      });

      const results = response.data;

      if (response.status === 200 || response.status === 201) {
        toast.success("Course Successfully Booked!");

        // Clear form data
        sessionStorage.removeItem("bookingFormData");

        // Redirect to confirmation page
        navigate("/booking-confirmation", {
          state: { course: courses, bookingData: results },
        });
      } else {
        throw new Error(results.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to book course. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    navigate("/booking-course/billing", { state: { course: courses } });
  };

  const openTerms = () => {
    // This would typically open a modal or navigate to terms page
    toast.info("Terms and conditions would be displayed here");
  };

  return (
    <>
      {/* <section>
        <div className="relative w-full h-full course-bg">
          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
                Booking Courses
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Course", to: "/" },
                  { label: "Booking Courses", to: "/booking-course/general" },
                  { label: "Legal" },
                ]}
              />
            </div>
          </div>
        </div>
      </section> */}

   
      <section className="w-full  flex justify-center relative py-3">
        <div className="w-full md:w-[95%] px-5 md:px-10 shadow-lg rounded-xl bg-white py-5   sticky top-0">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-green-500">
                ✔
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                General
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Completed
              </span>
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-green-500"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-green-500">
                ✔
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                Billing Details
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Completed
              </span>
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-green-500"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                    : "bg-gray-300"
                }`}
              >
                3
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                Legal
              </p>
              <span
                className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                  isFormValid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isFormValid ? "Complete" : "Missing Information"}
              </span>
            </div>
          </div>

          {/* Form fields */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid gap-1.5 pt-4">
              <label className="font-medium">
                By selecting "Yes" you are indicating that you have read and
                accepted our Website and{" "}
                <Link to="/terms-and-conditions">
                  <span className="font-bold text-[#DB0032] hover:text-[#FA6602] cursor-pointer">
                    Terms and Conditions
                  </span>
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy">
                  <span className="font-bold text-[#DB0032] hover:text-[#FA6602] cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>{" "}
                and accept the cancellation policy applicable to this programme.
              </label>

              <p className="mt-3 font-medium">Do you accept these terms?</p>

              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="terms"
                    value="yes"
                    checked={formData.terms === "yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#DB0032] focus:ring-[#DB0032] border-gray-300"
                  />
                  <span className="text-gray-700">Yes, I accept</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="terms"
                    value="no"
                    checked={formData.terms === "no"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#DB0032] focus:ring-[#DB0032] border-gray-300"
                  />
                  <span className="text-gray-700">No, I do not accept</span>
                </label>
              </div>

              {errors.terms && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.terms}
                </p>
              )}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition disabled:opacity-50"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookCoarseLegal;
