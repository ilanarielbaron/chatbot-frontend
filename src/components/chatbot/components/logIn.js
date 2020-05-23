import {sendMessage, setData} from "../Functions"

export const logInBody = (newList, newMessage, logIn, setUserData, userData, sendBotMessage, setLogIn, onLogin, setMessages) => {
  switch (logIn) {
    case 1:
      setUserData(setData(userData, { user: newMessage }));
      sendBotMessage(newList, "Type your password");
      setLogIn(logIn + 1);
      break;
    case 2:
      setUserData(setData(userData, { password: newMessage }));
      sendBotMessage(newList, "Wait...");
      onLogin(setData(userData, { password: newMessage }))
        .then(() => {
          setMessages(sendMessage(newList, "Login success"));
        })
        .catch(() => {
          setMessages(sendMessage(newList, "Login failed"));
        });
      setLogIn(0);
      break;
    default:
  }
};
