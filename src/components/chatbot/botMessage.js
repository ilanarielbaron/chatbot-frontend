import React  from "react";

// eslint-disable-next-line react/prop-types
export const BotMessage = ({ message }) => {
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          {/* eslint-disable-next-line react/prop-types */}
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
};
