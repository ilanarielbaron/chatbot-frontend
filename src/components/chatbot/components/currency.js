import { sendMessage } from "../Functions";

export const currencyBody = (
  newList,
  newMessage,
  sendBotMessage,
  setChangeCurrency,
  updateCurrency,
  setMessages,
  response
) => {
  sendBotMessage(newList, "Wait...");
  if(newMessage.length === 0){
    setMessages(sendMessage(newList, "You have to enter a valid currency"));
    return;
  }
  if (response.data !== undefined) {
    updateCurrency({defaultCurrency:newMessage}, response)
      .then(() => {
        setMessages(sendMessage(newList, "Currency changed"));
      })
      .catch(() => {
        setMessages(sendMessage(newList, "There was an error"));
      });
  } else {
    setMessages(sendMessage(newList, "You must login first"));
  }
  setChangeCurrency(0);
};
