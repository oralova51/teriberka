const { Payment } = require('../../db/models');

class PaymentService {
  static async createPaymentRecord(paymentData) {
    try {
      const payment = await Payment.create({
        payment_id: paymentData.id,
        status: paymentData.status,

        // "500.00" -> 500
        amount: Number(paymentData.amount.value),

        confirmation_url:
          paymentData.confirmation?.confirmation_url || null,
      });
      return payment;
    } catch (error) {
      console.error('Ошибка при создании записи платежа:', error);
      throw error;
    }
  }
  static async updateStatus(payment) {
    try {
      await Payment.update(
        { status: payment.status },
        { where: { payment_id: payment.id } }
      );
    } catch (error) {
      console.error('Ошибка при обновлении статуса платежа:', error);
      throw error;
    }
  }
}

module.exports = PaymentService;