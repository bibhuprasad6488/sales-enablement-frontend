import React, { useState } from "react";

const CommentSection = ({ comments }) => {
  const commentsPerPage = 3; // Number of comments per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8">
      {comments.length >= 1 && (
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          {comments.length} Comments
        </h3>
      )}

      {currentComments.map((comment) => (
        <div key={comment.id} className="pb-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-600 text-white font-bold text-sm">
              {comment.user_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800 text-lg">
                  {comment.user_name}
                </span>
                <span className="text-sm text-gray-500">
                  {comment.cmt_date}
                </span>
              </div>
              <p className="text-gray-700 text-base mt-1">{comment.message}</p>
            </div>
          </div>

          {comment.auth_reply && (
            <div className="ml-14 mt-6 flex space-x-4 bg-gray-50 p-4 rounded-xl shadow-sm">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-sm">
                A
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800 text-lg">
                    {comment.auth_name || "Admin"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {comment.reply_date}
                  </span>
                </div>
                <p className="text-gray-700 text-base mt-2 leading-relaxed">
                  {comment.auth_reply}
                </p>
              </div>
            </div>
          )}

          <hr className="mt-6 border-gray-300" />
        </div>
      ))}

      {/* Pagination Buttons */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            className={`h-7 w-7 rounded-lg shadow-md transition duration-300 ease-in-out flex justify-center items-center ${
              currentPage === idx + 1
                ? "bg-gradient-to-r from-[#DB0032] to-[#fa6602] text-white "
                : "bg-white text-[#eb3419] border-2 border-[#eb3419]"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
