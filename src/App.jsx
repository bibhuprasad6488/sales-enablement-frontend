import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScroolTop";
import ContextProviders from "./context/ContextProviders";

// ✅ Direct imports (no lazy loading)
import Home from "./pages/Home";
import About from "./pages/About";
import ServicePage from "./pages/ServicesPage";
import ServiceDetails from "./pages/ServiceDetails";
import Course from "./pages/Course";
import CourseDetails from "./pages/CourseDetails";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import ContactUsPage from "./pages/ContactUsPage";
import SampleRequestPage from "./pages/SampleRequestPage";
import LoginSignUp from "./auth/LoginSignUp";
import ChangePassword from "./auth/ChangePwd";
import NotFound from "./components/Not-found";
import DetailsSlug from "./home-sections/DetailsSlug";
import WhoweAre from "./home-sections/WhoweAre";
import MeasurableGrowth from "./service-section/MeasurableGrowth";
import BookingConfirmation from "./course-section/BookCoarseConfirmation";
import Book_stepper from "./course-Booking/Book_stepper";
import SalesForceEvaluation from "./service-section/dedicated-pages/SalesForceEvolution";
import CandidateAssessment from "./service-section/dedicated-pages/CandidateAssessment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <div
          style={{
            background: "linear-gradient(to right, #DB0032, #FA6602)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="flex flex-wrap">
            <Bars
              height="80"
              width="80"
              color="#FFFFFF"
              ariaLabel="bars-loading"
              visible={true}
            />
          </div>
        </div>
      ) : (
        <div
          className={`transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <ScrollToTop />
          <ContextProviders>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/service/:slug" element={<ServiceDetails />} />
              <Route path="/courses" element={<Course />} />
              <Route path="/pwd" element={<ChangePassword />} />
              <Route
                path="/courses-details/:slug"
                element={<CourseDetails />}
              />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blog-details/:slug" element={<BlogDetails />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route
                path="/services/sales-candidate-assessments/sample-sales-candidate-assessments"
                element={<SampleRequestPage />}
              />
              <Route
                path="/service/sales-force-details/:slug"
                element={<SalesForceEvaluation />}
              />
              <Route
                path="/service/sales-candidate-details/:slug"
                element={<CandidateAssessment />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/login-signup" element={<LoginSignUp />} />
              <Route path="/studydetails/:slug" element={<DetailsSlug />} />
              <Route path="/who-we-are" element={<WhoweAre />} />
              <Route path="/booking-course/*" element={<Book_stepper />} />
              <Route
                path="/booking-confirmation"
                element={<BookingConfirmation />}
              />
              <Route
                path="/sales-enablement-that-drives-measurable-growth"
                element={<MeasurableGrowth />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <ScrollToTopButton />
            <Footer />
            <ToastContainer />
          </ContextProviders>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
