import React from "react";
const Spreadsheet_Book = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <section className="flex w-full justify-center px-4 ">
      <div className="w-full md:w-4/5 mx-auto flex flex-col gap-7 justify-center border-b-4 border-orange-400 rounded-lg shadow-xl py-10 px-6">
        <p className="text-sm md:text-base">
          If you intend to register on behalf of an individual or group, please
          kindly download the Excel spreadsheet. If you intend registering
          yourself as part of the group, include your details, once completed
          please email
        </p>

        <a
          href={`${baseUrl}booking-excel/booking.xlsx`}
          download="The-salesenablement-booking-spreadsheet.xlsx"
          className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] 
                     hover:from-[#FA6602] hover:to-[#DB0032] 
                     transition-all duration-300 inline-block justify-content-baseline self-baseline cursor-pointer text-sm md:text-base text-center"
        >
          Download Booking Spreadsheet
        </a>
      </div>
    </section>
  );
};

export default Spreadsheet_Book;
