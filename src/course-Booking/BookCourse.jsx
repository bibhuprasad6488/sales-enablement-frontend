// BookCourse.js
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import BookCoarseGeneral from "./BookCoarseGeneral";
import BookCoarseBilling from "./BookCoarseBilling";
import BookCoarseLegal from "./BookCoarseLegal";

const BookCourse = () => {
  const location = useLocation();
  const courseData = location.state?.course;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="general" replace state={{ course: courseData }} />
          }
        />
        <Route path="general" element={<BookCoarseGeneral />} />
        <Route path="billing" element={<BookCoarseBilling />} />
        <Route path="legal" element={<BookCoarseLegal />} />
      </Routes>
    </>
  );
};

export default BookCourse;
