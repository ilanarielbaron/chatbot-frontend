import React, { useEffect, useRef, useState } from "react";
import { BotMessage } from "./botMessage";
import { UserMessage } from "./userMessage";
// eslint-disable-next-line import/named
import {
  cancel,
  hello,
  logInFinal,
  logInFirst, loginIssue,
  logInSecond, loginSuccess,
  notRecognized,
  registerIssue,
  registerSuccess,
  setData,
  signInFinal,
  signInFirst,
  signInSecond,
  signInThird,
} from "./Functions";

// eslint-disable-next-line react/prop-types
export const ChatbotBody = ({ onRegister, response, onLogin, loading }) => {
  const [messages, setMessages] = useState([
    { isChatbotMessage: 1, message: "Welcome to my world..." },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [signIn, setSignIn] = useState(0);
  const [logIn, setLogIn] = useState(0);
  const [newTransaction, setNewTransaction] = useState(0);
  const myRef = useRef(null);
  const [userData, setUserData] = useState({});

  const handleSendMessage = async () => {
    const newMessage = myRef.current.value;
    myRef.current.value = "";
    let newList = [...messages, { isChatbotMessage: 0, message: newMessage }];

    if (signIn === 3) {
      newList = [...messages, { isChatbotMessage: 0, message: "******" }];
    }

    setMessages(newList);

    if (signIn > 0) {
      switch (signIn) {
        case 1:
          setIsLoading(true);
          setUserData(setData(userData, { name: newMessage }));
          setMessages(await signInSecond(newList));
          setSignIn(signIn + 1);
          setIsLoading(false);
          break;
        case 2:
          setIsLoading(true);
          setUserData(setData(userData, { user: newMessage }));
          setMessages(await signInThird(newList));
          setSignIn(signIn + 1);
          setIsLoading(false);
          break;
        case 3:
          setIsLoading(true);
          setUserData(setData(userData, { password: newMessage }));
          setMessages(await signInFinal(newList));
          if (await onRegister(setData(userData, { password: newMessage })) ===  true) {
            setMessages(await registerSuccess(newList));
          } else {
            setMessages(await registerIssue(newList));
          }
          setSignIn(0);
          setIsLoading(false);
          break;
        default:
      }
      myRef.current.focus();
      return;
    }

    if (logIn > 0) {
      switch (logIn) {
        case 1:
          setIsLoading(true);
          setUserData(setData(userData, { user: newMessage }));
          setMessages(await logInSecond(newList));
          setLogIn(logIn + 1);
          setIsLoading(false);
          break;
        case 2:
          setIsLoading(true);
          setUserData(setData(userData, { password: newMessage }));
          setMessages(await logInFinal(newList));
          if(await onLogin(setData(userData, { password: newMessage }))) {
            setMessages(await loginSuccess(newList));
          } else {
            setMessages(await loginIssue(newList));
          }
          setLogIn(0);
          setIsLoading(false);
          break;
        default:
      }
      myRef.current.focus();
      return;
    }

    switch (newMessage.toLowerCase()) {
      case "hello":
      case "hello!":
        setIsLoading(true);
        setMessages(await hello(newList));
        setIsLoading(false);
        break;
      case "cancel":
        setIsLoading(true);
        setMessages(await cancel(newList));
        setSignIn(0);
        setLogIn(0);
        setNewTransaction(0);
        setIsLoading(false);
        break;
      case "clear":
        setIsLoading(true);
        setMessages([]);
        setIsLoading(false);
        break;
      case "signin":
      case "sign in":
      case "sign":
      case "signup":
      case "sign up":
        setIsLoading(true);
        setMessages(await signInFirst(newList));
        setSignIn(signIn + 1);
        setIsLoading(false);
        break;
      case "login":
      case "log in":
        setIsLoading(true);
        setMessages(await logInFirst(newList));
        setLogIn(logIn + 1);
        setIsLoading(false);
        break;
      default:
        setIsLoading(true);
        setMessages(await notRecognized(newList));
        setIsLoading(false);
    }
    myRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage().then();
    }
  };

  return (
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
                  type={signIn === 3 ? "password" : "text"}
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
};
