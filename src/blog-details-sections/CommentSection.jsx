import React from "react";
const CommentSection = () => {
  const comments = [
    {
      id: 1,
      author: "Kevin Martin",
      date: "March 20, 2023 at 2:37 PM",
      content: "Neque porro est qui dolorem ipsum quia quaed inventor veritatis et beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var.",
      replies: [
        {
          id: 1,
          author: "Kevin Martin",
          date: "March 20, 2023 at 2:37 PM",
          content: "Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var.",
        },
      ],
    },
  ];
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">02 Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="border-t border-gray-300 pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start space-x-3">
              <span className="font-semibold text-gray-800 text-lg">
                {comment.author}
              </span>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-700 text-base">{comment.content}</p>
            <button className="text-sm text-[#DB0032] hover:text-[#FA6602] font-semibold hover:underline">
              Reply
            </button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-6 border-t border-gray-200 pt-6">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="font-semibold text-gray-800 text-lg">
                      {reply.author}
                    </span>
                    <span className="text-sm text-gray-500">{reply.date}</span>
                  </div>
                  <p className="text-gray-700 text-base">{reply.content}</p>
                  <button className="text-sm text-[#DB0032] hover:text-[#FA6602] font-semibold hover:underline">
                    Reply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-8">
        <button className="px-6 py-2 bg-[#DB0032] text-white rounded-lg shadow-md hover:bg-[#FA6602] transition duration-300 ease-in-out">
          1
        </button>
        <button className="px-6 py-2 bg-white text-[#DB0032] border-2 border-[#DB0032] rounded-lg shadow-md hover:bg-[#FA6602] hover:text-white transition duration-300 ease-in-out">
          2
        </button>
        <button className="px-6 py-2 bg-white text-[#DB0032] border-2 border-[#DB0032] rounded-lg shadow-md hover:bg-[#FA6602] hover:text-white transition duration-300 ease-in-out">
          3
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
