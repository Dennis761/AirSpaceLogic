import axios from 'axios';

export const sendMessageToTelegram = async (adminId, chatId, message) => {
  const telegramUrl = `https://api.telegram.org/bot${adminId}/sendMessage`;

  try {
    const response = await axios.post(telegramUrl, {
      chat_id: chatId,
      text: message,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error);
    throw error;
  }
};
