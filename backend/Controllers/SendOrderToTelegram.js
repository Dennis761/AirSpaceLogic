import { sendMessageToTelegram } from '../services/telegramService.js';

export const sendOrderToTelegram = async (req, res) => {

    const ADMIN_CHAT_ID_1 = process.env.ADMIN_CHAT_ID_1;
    const ADMIN_CHAT_ID_2 = process.env.ADMIN_CHAT_ID_2;
    const TELEGRAM_ORDER_BOT_TOKEN = process.env.TELEGRAM_ORDER_BOT_TOKEN;

    const { firstName, lastName, phone, email, address, deliveryMethod, paymentMethod, comment, products, total, savedCurrency } = req.body;

    const message = `
    Новый заказ:
    ${firstName? `Имя: ${firstName}` : ''} ${lastName? lastName : ''}
    ${phone? `Телефон: ${phone}` : '' }
    ${email? `E-Mail: ${email}` : '' }
    ${address? `Адрес: ${address}` : '' }
    Способ доставки: ${deliveryMethod === 'pickup' ? 'В отделение' : 'Курьерская доставка'}
    Способ оплаты: ${paymentMethod === 'cash' ? 'Наложенный платеж' : 'Банковский перевод'}
    Комментарий: ${comment}
    Товары: 
    ${products.map((product) => `- ${product.name} x${product.quantity} - ${product.price * product.quantity} грн`).join('\n')}
    Итого: ${total} ${savedCurrency}
    `;

    try {
        await sendMessageToTelegram(TELEGRAM_ORDER_BOT_TOKEN, ADMIN_CHAT_ID_1,  message)
        await sendMessageToTelegram(TELEGRAM_ORDER_BOT_TOKEN, ADMIN_CHAT_ID_2,  message)
        res.status(200).json({ success: true, message: 'Заказ успешно отправлен в Telegram' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при отправке заказа' });
    }
};
