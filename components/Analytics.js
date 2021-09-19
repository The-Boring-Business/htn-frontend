import React from "react";

const Analytics = () => {
  return (
    <div
      className="flex flex-col m-6  py-4 px-6 bg-white rounded-lg drop-shadow-xl"
      style={{ height: "36.5rem" }}
    >
      <h1 className="text-2xl font-bold">Analytics</h1>
      <iframe src="https://dash.gallery/dash-time-series/" height={800} className="m-4"/>
    </div>
  );
};

export default Analytics;
