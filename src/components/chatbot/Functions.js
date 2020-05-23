export const hello = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Hello!'}];
}

export const signInFirst = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Type your name'}];
}

export const signInSecond = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Type your user'}];
}

export const signInThird = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Type your password'}];
}

export const signInFinal = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Wait...'}];
}

export const logInFirst = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Type your user'}];
}

export const logInSecond = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Type your password'}];
}

export const logInFinal = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Wait...'}];
}

export const notRecognized = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Message not recognized'}];
}

export const registerIssue = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Register issue'}];
}

export const registerSuccess = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Registration success'}];
}

export const loginIssue = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Login issue'}];
}

export const loginSuccess = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Login success'}];
}

export const cancel = async (messages) => {
  return [...messages, {isChatbotMessage: 1, message: 'Cancelled'}];
}

export const setData = (userData, newData) => {
  return {...userData, ...newData }
}
