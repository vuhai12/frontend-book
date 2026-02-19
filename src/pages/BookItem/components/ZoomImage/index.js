import { useState } from "react";

export const ZoomImage = ({ src }) => {
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "scale(1)",
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="overflow-hidden cursor-zoom-in bg-white rounded-[10px]"
    >
      <img
        src={src}
        style={style}
        className="transition-transform duration-200 ease-out w-full"
      />
    </div>
  );
};
