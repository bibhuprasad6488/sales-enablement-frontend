import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

function CommentPost({ BlogId }) {
  const [comment, setComment] = useState(""); // single comment input
  const [isLoading, setIsLoading] = useState(false); // loading state


  const handleComment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    try {
      setIsLoading(true);
      const payload = { user_id: userId, blog_id: BlogId, comment: comment };
      const response = await axios.post("/blog-comment-store", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        // toast.success("Comment posted successfully!", {
        //   position: "top-right",
        //   autoClose: 2000,
        // });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full mt-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Post a Comment</h3>

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Bars height="40" width="40" color="#DB0032" ariaLabel="loading" />
        </div>
      )}

      <form className="space-y-4" onSubmit={handleComment}>
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            required
            disabled={isLoading}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={(e) => {
              const token = localStorage.getItem("token");
              if (!token) {
                e.preventDefault(); // prevent form submission
                toast.warning("Please Login to comment", {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            }}
            className={`px-6 py-2 rounded-md text-white transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#DB0032] to-[#FA6602] hover:bg-gradient-to-l"
            }`}
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentPost;
