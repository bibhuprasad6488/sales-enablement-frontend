// BookCoarseBilling.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import nationality from "./country.json";

const BookCoarseBilling = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courses = location.state?.course;
  const courseName = courses?.name || "";

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    const defaultData = {
      account: "",
      country: "",
      postalAd_1: "",
      postalAd_2: "",
      city: "",
      sendingEmail: "",
      organisationBilling: "The Sales Enablement Company",
      division: "",
      division_on_the_invoice: "",
      vatNumber: "",
      zip_code: "",
      billing_province: "",
      billing_postalcode: "",
    };
    return savedData
      ? { ...defaultData, ...JSON.parse(savedData) }
      : defaultData;
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form on data change
  useEffect(() => {
    const validateForm = () => {
      let formErrors = {};
      const requiredFields = [
        "account",
        "country",
        "postalAd_1",
        "postalAd_2",
        "city",
        "sendingEmail",
      ];

      // Email format validation
      if (
        formData.sendingEmail &&
        !/\S+@\S+\.\S+/.test(formData.sendingEmail)
      ) {
        formErrors.sendingEmail = "Please enter a valid email address";
      }

      if (formData.account === "Company") {
        requiredFields.push("organisationBilling", "division_on_the_invoice");

        if (!formData.division_on_the_invoice) {
          formErrors.division_on_the_invoice = "This selection is required";
        }
      }

      if (formData.country && formData.country !== "South Africa") {
        requiredFields.push("zip_code");
      } else if (formData.country === "South Africa") {
        requiredFields.push("billing_province", "billing_postalcode");
      }

      requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].toString().trim() === "") {
          formErrors[field] = "This field is required";
        }
      });

      setErrors(formErrors);
      setIsFormValid(Object.keys(formErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (isFormValid) {
      sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
      navigate("/booking-course/legal", { state: { course: courses } });
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(
          `[name="${firstErrorField}"]`
        );
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  const prevStep = () => {
    sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
    navigate("/booking-course/general", { state: { course: courses } });
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
                  { label: "Billing Details" },
                ]}
              />
            </div>
          </div>
        </div>
      </section> */}

      <h1 className="text-center mt-10 text-4xl font-black uppercase">
        {courseName}
      </h1>

      <section className="px-2 md:px-10 flex justify-center bg-white relative py-3">
        <div className="w-full md:w-[100%] shadow-lg rounded-xl bg-white p-8 sticky top-0">
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
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                    : "bg-gray-300"
                }`}
              >
                2
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#DB0032]">
                Billing Details
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
              <div className="absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 bg-gray-300"></div>
            </div>

            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold z-10 bg-gray-300">
                3
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600">
                Legal
              </p>
              <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                Not Started
              </span>
            </div>
          </div>

          {/* Form fields */}
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-1.5">
                <label htmlFor="account">Responsible for account</label>
                <select
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  className={`w-full p-2 pl-4 border rounded-lg ${
                    errors.account ? "border-red-500 bg-red-50" : "bg-slate-100"
                  } text-gray-600`}
                >
                  <option value="">-- Please Select --</option>
                  {["Self", "Company"].map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.account && (
                  <p className="text-red-500 text-xs mt-1">{errors.account}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="country">Country</label>
                <select
                  onChange={handleChange}
                  name="country"
                  value={formData.country}
                  className={`w-full p-2 pl-4 border rounded-lg ${
                    errors.country ? "border-red-500 bg-red-50" : "bg-slate-100"
                  } text-gray-600`}
                >
                  <option value="">-- Please Select --</option>
                  {nationality.map((opt, i) => (
                    <option key={i} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              {formData.account === "Company" && (
                <>
                  <div className="grid gap-1.5">
                    <label htmlFor="organisationBilling">Organisation</label>
                    <select
                      name="organisationBilling"
                      value={formData.organisationBilling}
                      onChange={handleChange}
                      className={`w-full p-2 pl-4 border rounded-lg ${
                        errors.organisationBilling
                          ? "border-red-500 bg-red-50"
                          : "bg-slate-100"
                      } text-gray-600`}
                    >
                      <option value="">The Sales Enablement Company</option>
                      {[].map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.organisationBilling && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.organisationBilling}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="division">Division (optional)</label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className="w-full p-2 pl-4 border rounded-lg bg-slate-100 text-gray-600"
                    >
                      <option value="">-- Please Select --</option>
                      {[
                        "QUANTUM FOODS",
                        "Mobile Network Oparation",
                        "Hospital Manager",
                        "IT",
                      ].map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="division_on_the_invoice">
                      Do you want the division on the invoice?
                    </label>
                    <div className="flex items-center gap-4 mt-1">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="division_on_the_invoice"
                          value="yes"
                          checked={formData.division_on_the_invoice === "yes"}
                          onChange={handleChange}
                          className="text-[#DB0032] focus:ring-[#DB0032]"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="division_on_the_invoice"
                          value="no"
                          checked={formData.division_on_the_invoice === "no"}
                          onChange={handleChange}
                          className="text-[#DB0032] focus:ring-[#DB0032]"
                        />
                        No
                      </label>
                    </div>
                    {errors.division_on_the_invoice && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.division_on_the_invoice}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="vatNumber">Vat number (optional)</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="vatNumber"
                      value={formData.vatNumber}
                      className="w-full p-2 border rounded-lg text-gray-600 bg-slate-100"
                    />
                  </div>
                </>
              )}

              <div className="grid gap-1.5">
                <label htmlFor="postalAd_1">Postal address line 1</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="postalAd_1"
                  value={formData.postalAd_1}
                  className={`w-full p-2 border rounded-lg ${
                    errors.postalAd_1
                      ? "border-red-500 bg-red-50"
                      : "bg-slate-100"
                  } text-gray-600`}
                />
                {errors.postalAd_1 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalAd_1}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="postalAd_2">
                  Postal address line 2{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="postalAd_2"
                  value={formData.postalAd_2}
                  className={`w-full p-2 border rounded-lg ${
                    errors.postalAd_2
                      ? "border-red-500 bg-red-50"
                      : "bg-slate-100"
                  } text-gray-600`}
                />
                {errors.postalAd_2 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalAd_2}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="city">Town / city</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="city"
                  value={formData.city}
                  className={`w-full p-2 border rounded-lg ${
                    errors.city ? "border-red-500 bg-red-50" : "bg-slate-100"
                  } text-gray-600`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="sendingEmail">Email to send invoice to</label>
                <input
                  type="email"
                  onChange={handleChange}
                  name="sendingEmail"
                  value={formData.sendingEmail}
                  className={`w-full p-2 border rounded-lg ${
                    errors.sendingEmail
                      ? "border-red-500 bg-red-50"
                      : "bg-slate-100"
                  } text-gray-600`}
                />
                {errors.sendingEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sendingEmail}
                  </p>
                )}
              </div>

              {formData.country === "South Africa" && (
                <>
                  <div className="grid gap-1.5">
                    <label htmlFor="billing_province">Province</label>
                    <select
                      name="billing_province"
                      value={formData.billing_province}
                      onChange={handleChange}
                      className={`w-full p-2 pl-4 border rounded-lg ${
                        errors.billing_province
                          ? "border-red-500 bg-red-50"
                          : "bg-slate-100"
                      } text-gray-600`}
                    >
                      <option value="">-- Please Select --</option>
                      {[
                        "Western Cape",
                        "Free State",
                        "Limpopo",
                        "Northerb Cape",
                      ].map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.billing_province && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.billing_province}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="billing_postalcode">Postal code</label>
                    <input
                      type="text"
                      name="billing_postalcode"
                      value={formData.billing_postalcode}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-lg ${
                        errors.billing_postalcode
                          ? "border-red-500 bg-red-50"
                          : "bg-slate-100"
                      } text-gray-600`}
                    />
                    {errors.billing_postalcode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.billing_postalcode}
                      </p>
                    )}
                  </div>
                </>
              )}

              {formData.country && formData.country !== "South Africa" && (
                <div className="grid gap-1.5">
                  <label htmlFor="zip_code">International zip code</label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.zip_code
                        ? "border-red-500 bg-red-50"
                        : "bg-slate-100"
                    } text-gray-600`}
                  />
                  {errors.zip_code && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.zip_code}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!isFormValid}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:opacity-90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookCoarseBilling;
