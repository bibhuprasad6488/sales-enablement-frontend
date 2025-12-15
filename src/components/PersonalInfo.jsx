import { useEffect, useState } from "react";
import RightArrow1 from "../assets/arrow-right1.webp";
import { toast, ToastContainer } from "react-toastify";

const FormWithProgress = () => {
  const [step, setStep] = useState(1);

  const userData = JSON.parse(localStorage.getItem("user_data"));

  const [formData, setFormData] = useState({
    username: "",
    surname: userData?.last_name || "",
    firstName: userData?.first_name || "",
    email: userData?.email || "",
    areasOfInterest: [],
    nextOfKin: { fullName: "", relationship: "" },
  });
  const [errors, setErrors] = useState({});
  //   useEffect(() => {
  //     if (userData) {
  //       setFormData({
  //         surname: userData?.last_name || "",
  //         firstName: userData?.first_name || "",
  //         email: userData?.email || "",
  //       });
  //     }
  //   }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedForm = { ...formData };

    if (name.startsWith("nextOfKin")) {
      updatedForm = {
        ...formData,
        nextOfKin: {
          ...formData.nextOfKin,
          [name.split(".")[1]]: value,
        },
      };
    } else if (name === "areasOfInterest") {
      const selectedOptions = [...e.target.options]
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      updatedForm = { ...formData, areasOfInterest: selectedOptions };
    } else {
      updatedForm = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };
    }

    setFormData(updatedForm);

    // ✅ Clear only this field’s error if it becomes valid
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (
        name === "areasOfInterest" &&
        updatedForm.areasOfInterest.length > 0
      ) {
        delete newErrors.areasOfInterest;
      } else if (name.startsWith("nextOfKin")) {
        const field = name; // e.g. "nextOfKin.fullName"
        if (value.trim() !== "") {
          delete newErrors[field];
        }
      } else {
        if (value.trim() !== "") {
          delete newErrors[name];
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Flatten form fields for validation
    const requiredFields = {
      username: formData.username,

      areasOfInterest: formData.areasOfInterest,
      "nextOfKin.fullName": formData.nextOfKin.fullName,
      "nextOfKin.relationship": formData.nextOfKin.relationship,
    };

    let newErrors = {};
    for (let key in requiredFields) {
      if (
        (Array.isArray(requiredFields[key]) &&
          requiredFields[key].length === 0) ||
        (!Array.isArray(requiredFields[key]) && !requiredFields[key])
      ) {
        newErrors[key] = "This field is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields before submitting.");
      return;
    }

    // ✅ Only runs if all fields are filled
    toast.success("Form submitted successfully");
    localStorage.setItem("PersonalInfo", JSON.stringify(formData));
    setFormData({
      ...formData,
      username: "",
      dateOfBirth: "",
      areasOfInterest: [],
      nextOfKin: { fullName: "", relationship: "" },
    });

    // Clear errors after reset
    setErrors({});
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.username) newErrors.username = "Username is required";
    }

    if (step === 2) {
      if (formData.areasOfInterest?.length === 0) {
        newErrors.areasOfInterest = "Please select at least one interest";
      }
    }

    if (step === 3) {
      if (!formData.nextOfKin.fullName) {
        newErrors["nextOfKin.fullName"] = "Full name is required";
      }
      if (!formData.nextOfKin.relationship) {
        newErrors["nextOfKin.relationship"] = "Relationship is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const steps = [
    {
      title: "Personal Info",
      completed:
        formData.username &&
        formData.firstName &&
        formData.surname &&
        formData.email,
    },
    {
      title: "Areas of Interest",
      completed: formData.areasOfInterest?.length > 0,
    },
    {
      title: "Next of Kin",
      completed:
        formData.nextOfKin?.fullName && formData.nextOfKin?.relationship,
    },
  ];

  return (
    <>
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 space-x-8">
        <div className="p-4 sm:block hidden">
          <div className="space-y-4">
            {steps.map((s, index) => (
              <div key={index} className="flex items-start  relative">
                {index !== steps.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-300"></div>
                )}

                <div className="relative">
                  <div className="absolute inset-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#DB0032] to-[#FA6602]"></div>

                  <div
                    className={`relative w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-500 ${
                      s.completed
                        ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602]"
                        : ""
                    } text-white font-bold`}
                  >
                    {s.completed ? "✔" : ""}
                  </div>
                </div>

                <div className="flex flex-col space-x-2 mx-5">
                  <p className="font-light text-gray-700 mt-1">{s.title}</p>
                  <span
                    className={`text-xs font-light w-24 py-1 mt-2 px-1 text-center rounded-sm border-2 border-red-400 ${
                      s.completed
                        ? "text-white border-blue-950 bg-[#383F71]"
                        : s.optional
                        ? "text-gray-500"
                        : "text-red-600"
                    }`}
                  >
                    {s.completed
                      ? "Completed"
                      : s.optional
                      ? "Optional"
                      : "In Progress"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-xl bg-white p-6   shadow-xl mx-4 md:mx-6 lg:mx-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <h3 className="lg:text-3xl text-2xl font-extrabold mb-4 text-center text-gray-800">
                  Personal Information
                </h3>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  readOnly
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
                <label className="block text-sm font-medium">Surname</label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  readOnly
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm">{errors.surname}</p>
                )}
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  readOnly
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-xl font-semibold">Areas of Interest</h3>
                <label className="block text-sm font-medium cursor-pointer">
                  Select Interests
                </label>
                <select
                  name="areasOfInterest"
                  multiple
                  value={formData.areasOfInterest}
                  onChange={handleChange}
                  className="w-full border cursor-pointer border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                >
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Sports">Sports</option>
                  <option value="Health">Health</option>
                </select>
                {errors.areasOfInterest && (
                  <p className="text-red-500 text-sm">
                    {errors.areasOfInterest}
                  </p>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-xl font-semibold">Next of Kin</h3>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="nextOfKin.fullName"
                  placeholder="Full Name"
                  value={formData.nextOfKin.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                {errors["nextOfKin.fullName"] && (
                  <p className="text-red-500 text-sm">
                    {errors["nextOfKin.fullName"]}
                  </p>
                )}

                <label className="block text-sm font-medium">
                  Relationship
                </label>
                <input
                  type="text"
                  name="nextOfKin.relationship"
                  placeholder="Relationship"
                  value={formData.nextOfKin.relationship}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 hover:ring-1 hover:ring-[#060B33] focus:ring-[#383F71] appearance-none"
                />
                {errors["nextOfKin.relationship"] && (
                  <p className="text-red-500 text-sm">
                    {errors["nextOfKin.relationship"]}
                  </p>
                )}
              </>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  type="button"
                  className="text-white w-1/3 group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5   flex items-center justify-center"
                >
                  <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                  <span className="relative text-white group-hover:text-white flex items-center">
                    <img
                      loading="lazy"
                      src={RightArrow1}
                      alt="Arrow Icon"
                      className="w-6 h-6 mr-2 transition-transform rotate-180 duration-300 ease-in-out"
                    />
                    Prev
                  </span>
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={nextStep}
                  type="button"
                  className="text-white w-1/3 group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5   flex items-center justify-center"
                >
                  <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                  <span className="relative text-white group-hover:text-white flex items-center">
                    Next
                    <img
                      loading="lazy"
                      src={RightArrow1}
                      alt="Arrow Icon"
                      className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                    />
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white w-1/3 group text-nowrap transition-transform duration-500 ease-out transform uppercase bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-bl focus:outline-none text-sm md:text-[13px] px-5 py-2.5   flex items-center justify-center"
                >
                  <span className="absolute inset-0 w-0 h-full bg-[#060b33] transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
                  <span className="relative text-white group-hover:text-white flex items-center">
                    Submit
                    <img
                      loading="lazy"
                      src={RightArrow1}
                      alt="Arrow Icon"
                      className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out"
                    />
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FormWithProgress;
