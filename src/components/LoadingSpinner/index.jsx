const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#E4572E] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-[#4B3F8F] animate-spin-slow"></div>
        </div>

        {/* Text */}
        <p className="text-[#4B3F8F] font-semibold tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
