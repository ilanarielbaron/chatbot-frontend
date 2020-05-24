import {sendMessage, setData} from "../Functions"

export const signInBody = (newList, newMessage, signIn, setUserData, userData, sendBotMessage, setSignIn, onRegister, setMessages) => {
  switch (signIn) {
    case 1:
      setUserData(setData(userData, { name: newMessage }));
      sendBotMessage(newList, "Type your user");
      setSignIn(signIn + 1);
      break;
    case 2:
      setUserData(setData(userData, { user: newMessage }));
      sendBotMessage(newList, "Type your default currency");
      setSignIn(signIn + 1);
      break;
    case 3:
      if(newMessage && newMessage !== "") {
        setUserData(setData(userData, { defaultCurrency: newMessage }));
      }
      sendBotMessage(newList, "Type your password");
      setSignIn(signIn + 1);
      break;
    case 4:
      setUserData(setData(userData, { password: newMessage }));
      sendBotMessage(newList, "Wait...");
      onRegister(setData(userData, { password: newMessage }))
        .then(() => {
          setMessages(sendMessage(newList, "Register success"));
        })
        .catch(() => {
          setMessages(sendMessage(newList, "Register issue"));
        });
      setSignIn(0);
      break;
    default:
  }
};
