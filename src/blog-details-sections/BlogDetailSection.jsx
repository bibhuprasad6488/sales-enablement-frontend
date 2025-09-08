import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import CommentPost from "./CommentPost";
import CommentSection from "./CommentSection";
import logoFacebook from "../assets/logoFacebook.png";
import logoInstagram from "../assets/logoInstagram.png";
import logoLinkedIn from "../assets/logoLinkedIn.png";
import logoTwitter from "../assets/logoTwitter.png";
import { ToastContainer } from "react-toastify";

const BlogDetailSection = ({
  Allblogdata,
  whitepaper = [],
  videos = [],
  Blogcomments = [],
  filters,
}) => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const currentUrl = window.location.href;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

 const shareTo = (platform) => {
   if (isMobile && navigator.share) {
     navigator
       .share({
         title: "the-sales-enablement",
         text: "Have a look at this website",
         url: currentUrl,
       })
       .catch((err) => console.error("Error sharing:", err));
     return;
   }
   let webUrl = "";
   switch (platform) {
     case "facebook":
       webUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
         currentUrl
       )}`;
       break;
     case "twitter":
       webUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
         currentUrl
       )}`;
       break;
     case "linkedin":
       webUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
         currentUrl
       )}`;
       break;
     case "instagram":
       webUrl = `https://instagram.com`;
       break;
     default:
       return;
   }

   window.open(webUrl, "_blank");
 };
  if (!Allblogdata) return <div>Loading...</div>;

  const handlePlay = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
    setShowShareOptions(false);
  };

  return (
    <>
      <section className="w-full md:w-3/4 py-3">
        {/* Title + Share Button */}
        <div className="flex items-center justify-between mb-6 flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug flex-1 pr-4">
            {Allblogdata?.title}
          </h2>

          <div className="relative mt-2 sm:mt-0 shrink-0 group">
            <button
              className="p-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              onClick={() => shareTo("facebook")}
            >
              <FaShareAlt size={18} />
            </button>

            {/* Hidden on mobile, visible on hover in desktop */}
            <div className="absolute right-0 bottom-[120%] md:bottom-[100%] mb-2 border-2 border-[#f04512] bg-white rounded-lg shadow-xl p-3 gap-4 z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:visible md:flex hidden">
              <a
                onClick={() => shareTo("facebook")}
                className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={logoFacebook}
                  alt="Share on Facebook"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                onClick={() => shareTo("twitter")}
                className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={logoTwitter}
                  alt="Share on Twitter"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                onClick={() => shareTo("linkedin")}
                className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={logoLinkedIn}
                  alt="Share on LinkedIn"
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                onClick={() => shareTo("instagram")}
                className="cursor-pointer flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={logoInstagram}
                  alt="Share on Instagram"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Blog Description */}
        <div>
          {Allblogdata?.description && (
            <p
              className="text-gray-700 prose mt-2 text-justify max-w-none"
              dangerouslySetInnerHTML={{
                __html: Allblogdata?.description,
              }}
            />
          )}
        </div>

        {/* Videos */}
        {videos && videos.length > 0 && (
          <div className="py-5 px-2">
            <div className="flex flex-wrap gap-4">
              {videos.map((videoContent, index) => {
                let videoId = null;
                try {
                  const urlObj = new URL(videoContent.vdo_link);
                  if (urlObj.hostname === "youtu.be") {
                    videoId = urlObj.pathname.slice(1);
                  } else {
                    videoId = new URLSearchParams(urlObj.search).get("v");
                  }
                } catch (e) {
                  console.error("Invalid video URL:", videoContent.vdo_link);
                }

                return (
                  <div
                    key={videoContent.id || index}
                    className="flex-1 min-w-[300px] max-w-[500px] p-4 rounded-lg relative"
                  >
                    {playingVideo === videoId ? (
                      <iframe
                        className="w-full h-full rounded-lg shadow-xl aspect-video"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div
                        className="relative w-full rounded-lg shadow-xl cursor-pointer overflow-hidden aspect-video"
                        onClick={() => handlePlay(videoId)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt="Video Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-16 w-16 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.752 11.168l-3.197-1.833A1 1 0 0010 10.25v3.5a1 1 0 001.555.832l3.197-1.833a1 1 0 000-1.664z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* White Papers */}
        {whitepaper && whitepaper.length > 0 && (
          <div className="py-6 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-black text-3xl font-semibold mb-6">
                White Papers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whitepaper.map((data, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-4">{data.title}</h3>
                    <p className="text-gray-700 mb-4">{data?.desc}</p>
                    <a
                      href={data?.btn_link}
                      className="text-[#DB0032] hover:text-[#FA6602] font-semibold"
                    >
                      {data.btn_text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <CommentSection comments={Blogcomments} />
        <CommentPost BlogId={Allblogdata?.id} />
      </section>

      <ToastContainer />
    </>
  );
};

export default BlogDetailSection;
