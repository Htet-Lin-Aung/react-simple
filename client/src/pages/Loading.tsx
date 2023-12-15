const Loading = () => {
	return (
	  <div className="w-screen h-screen flex items-center justify-center bg-gray-300">
		<div className="flex items-center space-x-2">
		  <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
		  <span className="text-gray-700">Loading...</span>
		</div>
	  </div>
	);
  };

export default Loading;
