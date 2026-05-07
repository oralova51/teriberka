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
  static async updateStatus(input) {
    try {
      // YooKassa notifications: { event, object: { id, status, ... } }
      // Ранее в проекте могли передавать либо req.body, либо object целиком.
      const paymentId = input?.id ?? input?.object?.id;
      const nextStatus = input?.status ?? input?.object?.status;
      console.log(paymentId, nextStatus);
      

      if (!paymentId || typeof paymentId !== 'string') {
        throw new Error(
          `[PaymentService.updateStatus] Invalid paymentId: ${String(paymentId)}`
        );
      }

      if (!nextStatus || typeof nextStatus !== 'string') {
        throw new Error(
          `[PaymentService.updateStatus] Invalid nextStatus: ${String(nextStatus)}`
        );
      }

      const [affectedRows] = await Payment.update(
        { status: nextStatus },
        { where: { payment_id: paymentId } }
      );

      return affectedRows;
    } catch (error) {
      console.error('Ошибка при обновлении статуса платежа:', error);
      throw error;
    }
  }
}

module.exports = PaymentService;