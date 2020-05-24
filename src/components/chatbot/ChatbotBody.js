import React, { useRef, useState } from "react";
import { sendMessage, setData } from "./Functions";
import { ChatbotContainer } from "./ChatbotContainer";
import { signInBody } from "./components/signIn";
import { logInBody } from "./components/logIn";
import { transactionBody } from "./components/transaction";
import { currencyBody } from "./components/currency";

export const ChatbotBody = ({
  onRegister,
  response,
  onLogin,
  saveTransaction,
  getTransactions,
  transactions,
  updateCurrency,
}) => {
  const [messages, setMessages] = useState([
    { isChatbotMessage: 1, message: "Welcome to my world..." },
    { isChatbotMessage: 1, message: "sign / s ----- User sign up" },
    { isChatbotMessage: 1, message: "login / l ----- User log-in" },
    {
      isChatbotMessage: 1,
      message: "currency / sc ----- Set default currency",
    },
    { isChatbotMessage: 1, message: "balance ----- See the account balance" },
    {
      isChatbotMessage: 1,
      message: "transactions / t ----- See the user transactions",
    },
    { isChatbotMessage: 1, message: "withdraw ----- Withdraw money" },
    { isChatbotMessage: 1, message: "deposit ----- Deposit in the account" },
    { isChatbotMessage: 1, message: "clear ----- Clear the screen" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [signIn, setSignIn] = useState(0);
  const [logIn, setLogIn] = useState(0);
  const [changeCurrency, setChangeCurrency] = useState(0);
  const [newTransaction, setNewTransaction] = useState(0);
  const myRef = useRef(null);
  const bodyRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [transactionData, setTransactionData] = useState({});
  const [waitingTransactions, setWaitingTransactions] = useState(false);

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
      bodyRef.current.scrollTo(0,5000);
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
      bodyRef.current.scrollTo(0,5000);
      return;
    }

    if (changeCurrency > 0) {
      currencyBody(
        newList,
        newMessage,
        sendBotMessage,
        setChangeCurrency,
        updateCurrency,
        setMessages,
        response
      );
      myRef.current.focus();
      bodyRef.current.scrollTo(0,5000);
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
        setMessages,
        response
      );
      myRef.current.focus();
      bodyRef.current.scrollTo(0,5000);
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
      case "c":
        setMessages([]);
        break;
      case "signin":
      case "sign in":
      case "sign":
      case "signup":
      case "s":
      case "sign up":
        sendBotMessage(newList, "Type your name");
        setSignIn(signIn + 1);
        break;
      case "login":
      case "log in":
      case "l":
        sendBotMessage(newList, "Type your user");
        setLogIn(logIn + 1);
        break;
      case "set currency":
      case "currency":
      case "cu":
      case "sc":
        sendBotMessage(newList, "Enter the new default currency");
        setChangeCurrency(changeCurrency + 1);
        break;
      case "balance":
        if (response.data !== undefined) {
          setMessages(sendMessage(newList, response.data.balance));
        } else {
          setMessages(sendMessage(newList, "You must login first"));
        }
        break;
      case "transactions":
      case "history":
      case "t":
      case "transaction history":
        sendBotMessage(newList, "Wait...");
        if (response.data !== undefined) {
          getTransactions(response)
            .then(function () {
              setWaitingTransactions(true);
            })
            .catch(() => {
              setMessages(sendMessage(newList, "There was an error"));
            });
        } else {
          setMessages(sendMessage(newList, "You must login first"));
        }
        break;
      case "withdraw":
      case "deposit":
        sendBotMessage(newList, "Enter the amount");
        if (newMessage === "withdraw") {
          setTransactionData(
            setData(transactionData, { amount: -1, type: newMessage })
          );
        } else {
          setTransactionData(
            setData(transactionData, { amount: 1, type: newMessage })
          );
        }
        setNewTransaction(newTransaction + 1);
        break;
      default:
        sendBotMessage(newList, "Message not recognized");
    }
    myRef.current.focus();
    bodyRef.current.scrollTo(0,5000);
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
    setChangeCurrency(0);
  };

  if (transactions?.length > 0 && waitingTransactions) {
    sendBotMessage(messages, JSON.stringify(transactions));
    setWaitingTransactions(false);
  }

  const initSendMessage = (newMessage) => {
    myRef.current.value = "";
    let newList = [...messages, { isChatbotMessage: 0, message: newMessage }];

    if (signIn === 4 || logIn === 2) {
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
      bodyRef={bodyRef}
    />
  );
};
