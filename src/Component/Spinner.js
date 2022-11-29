import React from "react";
import loading from "../loading.gif";
const Spinner = () => {
  return (
    <>
      <div className="text center  my-4  ">
        <img src={loading} alt="" className="rounded mx-auto d-block" />
      </div>
    </>
  );
};

export default Spinner;
