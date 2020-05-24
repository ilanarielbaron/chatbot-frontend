import { sendMessage, setData } from "../Functions";

export const transactionBody = (
  newList,
  newMessage,
  transactionCount,
  setTransactionData,
  transactionData,
  sendBotMessage,
  setNewTransaction,
  saveTransaction,
  setMessages,
  response
) => {
  switch (transactionCount) {
    case 1:
      setTransactionData(
        setData(transactionData, {
          amount: parseInt(newMessage) * transactionData.amount,
        })
      );
      sendBotMessage(
        newList,
        "Enter currency"
      );
      setNewTransaction(transactionCount + 1);
      break;
    case 2:
      if (newMessage !== "") {
        setTransactionData(setData(transactionData, { currency: newMessage }));
      }
      sendBotMessage(newList, "Wait...");
      saveTransaction((newMessage !== "" ? setData(transactionData, { currency: newMessage }) : transactionData), response)
        .then(() => {
          setMessages(sendMessage(newList, "Transaction added"));
        })
        .catch(() => {
          setMessages(sendMessage(newList, "Transaction failed"));
        });
      setNewTransaction(0);
      break;
    default:
  }
};
