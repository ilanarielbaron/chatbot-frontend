import React, { useRef, useState } from "react";
import { sendMessage, setData } from "./Functions";
import { ChatbotContainer } from "./ChatbotContainer";
import { signInBody } from "./components/signIn";
import { logInBody } from "./components/logIn";
import {transactionBody} from "./components/transaction"

// eslint-disable-next-line react/prop-types
export const ChatbotBody = ({ onRegister, response, onLogin, saveTransaction }) => {
  const [messages, setMessages] = useState([
    { isChatbotMessage: 1, message: "Welcome to my world..." },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [signIn, setSignIn] = useState(0);
  const [logIn, setLogIn] = useState(0);
  const [newTransaction, setNewTransaction] = useState(0);
  const myRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [transactionData, setTransactionData] = useState({});

  console.log(response);
  const handleSendMessage = () => {
    const newMessage = myRef.current.value;
    const newList = initSendMessage(newMessage);
    setMessages(newList);

    if (signIn > 0) {
      signInBody(
        newList,
        newMessage,
        signIn,
        setUserData,
        userData,
        sendBotMessage,
        setSignIn,
        onRegister,
        setMessages
      );
      myRef.current.focus();
      return;
    }

    if (logIn > 0) {
      logInBody(
        newList,
        newMessage,
        logIn,
        setUserData,
        userData,
        sendBotMessage,
        setLogIn,
        onLogin,
        setMessages
      );
      myRef.current.focus();
      return;
    }

    if (newTransaction > 0) {
      transactionBody(
        newList,
        newMessage,
        newTransaction,
        setTransactionData,
        transactionData,
        sendBotMessage,
        setNewTransaction,
        saveTransaction,
        setMessages
      );
      myRef.current.focus();
      return;
    }

    switch (newMessage.toLowerCase()) {
      case "hello":
      case "hello!":
        sendBotMessage(newList, "Hello!");
        break;
      case "cancel":
        sendBotMessage(newList, "Cancelled");
        cancelAction();
        break;
      case "clear":
        setMessages([]);
        break;
      case "signin":
      case "sign in":
      case "sign":
      case "signup":
      case "sign up":
        sendBotMessage(newList, "Type your name");
        setSignIn(signIn + 1);
        break;
      case "login":
      case "log in":
        sendBotMessage(newList, "Type your user");
        setLogIn(logIn + 1);
        break;
      case "withdraw":
      case "deposit":
        sendBotMessage(newList, "Enter the amount");
        if(newMessage === "withdraw"){
          setTransactionData(setData(transactionData, { amount: -1 }));
        } else {
          setTransactionData(setData(transactionData, { amount: 1 }));
        }
        setNewTransaction(newTransaction + 1);
        break;
      default:
        sendBotMessage(newList, "Message not recognized");
    }
    myRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const sendBotMessage = (newList, newMessage) => {
    setIsLoading(true);
    setMessages(sendMessage(newList, newMessage));
    setIsLoading(false);
  };

  const cancelAction = () => {
    setSignIn(0);
    setLogIn(0);
    setNewTransaction(0);
  };

  const initSendMessage = (newMessage) => {
    myRef.current.value = "";
    let newList = [...messages, { isChatbotMessage: 0, message: newMessage }];

    if (signIn === 3 || logIn === 2) {
      newList = [...messages, { isChatbotMessage: 0, message: "******" }];
    }

    return newList;
  };

  return (
    <ChatbotContainer
      myRef={myRef}
      handleSendMessage={handleSendMessage}
      handleKeyPress={handleKeyPress}
      isLoading={isLoading}
      logInCount={logIn}
      messages={messages}
      signInCount={signIn}
    />
  );
};
