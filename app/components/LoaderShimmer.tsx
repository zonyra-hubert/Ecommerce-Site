const LoaderShimmer = () => {
  return (
    <div className="flex flex-row items-center  py-10 gap-4">
      <div className="animate-pulse space-y-4 ">
        <div className="w-100 h-100 bg-gray-400 rounded"></div>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="w-100 h-100 bg-gray-400 rounded"></div>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="w-100 h-100 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default LoaderShimmer;
