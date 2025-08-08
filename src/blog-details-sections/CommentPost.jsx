import React from "react";
function CommentPost() {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg w-3/5 mt-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Post a Comment</h3>
        <form className="space-y-4">
          <p className="text-sm text-gray-500">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Your Comment *
            </label>
            <textarea
              id="comment"
              rows="4"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DB0032]"
              placeholder="Write your comment here..."
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DB0032]"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DB0032]"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-md hover:bg-gradient-to-l transition-all duration-300"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CommentPost;
