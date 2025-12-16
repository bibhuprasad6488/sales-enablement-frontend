import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Bars } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
// import ScrollToTopButton from "./components/ScroolTop";
// import ContextProviders from "./context/ContextProviders";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const ScrollToTopButton = lazy(() => import("./components/ScroolTop"));
const ContextProviders = lazy(() => import("./context/ContextProviders"));
// ✅ Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ServicePage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Course = lazy(() => import("./pages/Course"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const SampleRequestPage = lazy(() => import("./pages/SampleRequestPage"));
const LoginSignUp = lazy(() => import("./auth/LoginSignUp"));
const ChangePassword = lazy(() => import("./auth/ChangePwd"));
const NotFound = lazy(() => import("./components/Not-found"));
const DetailsSlug = lazy(() => import("./home-sections/DetailsSlug"));
const WhoweAre = lazy(() => import("./home-sections/WhoweAre"));
const MeasurableGrowth = lazy(() =>
  import("./service-section/MeasurableGrowth")
);
const BookingConfirmation = lazy(() =>
  import("./course-section/BookCoarseConfirmation")
);
const Book_stepper = lazy(() => import("./course-Booking/Book_stepper"));
const SalesForceEvaluation = lazy(() =>
  import("./service-section/dedicated-pages/SalesForceEvolution")
);
const CandidateAssessment = lazy(() =>
  import("./service-section/dedicated-pages/CandidateAssessment")
);
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* {isLoading ? (
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
        > */}
      <ScrollToTop />
      <ContextProviders>
        <Header />
        {/* ✅ Suspense wraps all routes so lazy components can show a fallback while loading */}
        <Suspense
          fallback={
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
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/service/:slug" element={<ServiceDetails />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/pwd" element={<ChangePassword />} />
            <Route path="/courses-details/:slug" element={<CourseDetails />} />
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
        </Suspense>

        <ScrollToTopButton />
        <Footer />
        <ToastContainer />
      </ContextProviders>
      {/* </div>
      )} */}
    </BrowserRouter>
  );
}

export default App;
