import React, { useState, useEffect } from "react";

const ScreenResolutionPopup = ({ closePopup }) => {
  const [screenResolution, setScreenResolution] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenResolution({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg text-sm">
      <p>Width: {screenResolution.width}px</p>
      <p>Height: {screenResolution.height}px</p>
    </div>
  );
};

export default ScreenResolutionPopup;
