import React  from "react";

// eslint-disable-next-line react/prop-types
export const UserMessage = ({ message }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        {/* eslint-disable-next-line react/prop-types */}
        <p>{message.message}</p>
      </div>
    </div>
  );
};
