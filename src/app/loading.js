import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    </div>
  );
};

export default loading;
