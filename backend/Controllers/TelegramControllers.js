import { sendMessageToTelegram } from '../services/telegramService.js';

export const sendTelegramMessage = async (req, res) => {
  const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  const { name, phoneNumber, comment } = req.body;
  
  const message = `Имя: ${name}\nНомер телефона: ${phoneNumber} Комментарий: ${comment}`;

  try {
    const response = await sendMessageToTelegram( TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID, message);
    res.status(200).json({ success: true, message: 'Запрос успешно отправлен!', response });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ошибка при отправке сообщения.' });
  }
};
