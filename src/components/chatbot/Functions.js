export const setData = (userData, newData) => {
  return { ...userData, ...newData };
};

export function sendMessage(messages, newMessage) {
  return [...messages, { isChatbotMessage: 1, message: newMessage }];
}
