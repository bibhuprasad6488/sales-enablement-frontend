import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaComment, FaEye, FaUser } from "react-icons/fa";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import CommentPost from "./CommentPost";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";

const BlogDetailSection = ({
  Allblogdata,
  whitepaper,
  videos,
  Blogcomments,
}) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const relatedCoursesData = [
        {
          id: 1,
          title: "Negotiation Skills",
          image: "/src/assets/course1.png",
        },
      ];
      setRelatedCourses(relatedCoursesData);
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!Allblogdata) return <div>Loading...</div>;

  const handlePlay = (videoId) => {
    setPlayingVideo(videoId);
  };

  return (
    <section className="w-3/4 py-3">
      {/* Title + Share Button */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 leading-snug w-full md:w-10/12 pr-4">
          {Allblogdata?.title}
        </h2>
        <div className="relative group mt-4 md:mt-0 shrink-0">
          <button className="p-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-full flex items-center justify-center transition-all duration-300">
            <FaShareAlt size={18} />
          </button>
          <div className="absolute right-0 bottom-12 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out px-2 py-1 flex gap-2">
            <a
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                  )}`,
                  "_blank"
                )
              }
              className="cursor-pointer"
            >
              <FaFacebook size={18} className="text-white" />
            </a>
            <a
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    currentUrl
                  )}`,
                  "_blank"
                )
              }
              className="cursor-pointer"
            >
              <FaTwitter size={18} className="text-white" />
            </a>
            <a
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    currentUrl
                  )}`,
                  "_blank"
                )
              }
              className="cursor-pointer"
            >
              <FaLinkedin size={18} className="text-white" />
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href);
                window.open("https://instagram.com", "_blank");
              }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} className="text-white" />
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
      <div className="py-5 px-2">
        <div className="flex flex-wrap gap-4">
          {videos.map((videoContent, index) => {
            const urlParams = new URLSearchParams(
              new URL(videoContent.vdo_link).search
            );
            const videoId = urlParams.get("v");

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

      {/* White Papers */}
      {whitepaper.length >= 1 && (
        <div className="py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-black text-3xl font-semibold mb-6">
              White Papers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whitepaper.map((data, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
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
  );
};

export default BlogDetailSection;
