import React from "react";

const Button = ({ children, btnstyle }) => {
  const toTop = () => {
    // window.scrollTo(0, 0);
  };

  return (
    <>
      <button type="button" className={`${btnstyle} `} onClick={() => toTop()}>
        {children}
      </button>
    </>
  );
};

export default Button;
