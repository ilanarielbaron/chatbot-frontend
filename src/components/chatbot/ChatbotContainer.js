import React from "react";
import { BotMessage } from "./botMessage";
import { UserMessage } from "./userMessage";

export const ChatbotContainer = ({
  messages,
  handleKeyPress,
  isLoading,
  signInCount,
  logInCount,
  myRef,
  handleSendMessage,
}) => (
  <div className="container">
    <h3 className=" text-center">Chatbot</h3>
    <div className="messaging">
      <div className="inbox_msg">
        <div className="mesgs">
          <div className="msg_history">
            {messages.map((message, index) => {
              if (message.isChatbotMessage) {
                return <BotMessage key={index} message={message} />;
              } else {
                return <UserMessage key={index} message={message} />;
              }
            })}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input
                autoFocus
                onKeyPress={handleKeyPress}
                disabled={isLoading ?? "disabled"}
                type={
                  signInCount === 4 || logInCount === 2 ? "password" : "text"
                }
                className="write_msg"
                placeholder="Type a message"
                ref={myRef}
              />
              <button
                className="msg_send_btn"
                type="button"
                onClick={handleSendMessage}
              >
                <i className="fa fa-paper-plane-o" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
