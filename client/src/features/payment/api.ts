import { axiosInstance } from "../../shared/lib/axiosInstance";

export type CreatePaymentResult = {
  payment_id: string;
  order_id?: string;
  confirmation_url: string;
};

export type PaymentStatusResult = {
  payment_id?: string;
  status: string;
  paid: boolean;
};

export class PaymentApi {
  static async createPayment(data: {
    value: number;
  }): Promise<CreatePaymentResult> {
    const response = await axiosInstance.post("/payment", data);
    const { data: responseData } = response;

    if (
      typeof responseData?.payment_id === "string" &&
      typeof responseData?.confirmation_url === "string"
    ) {
      return {
        payment_id: responseData.payment_id,
        order_id: responseData.order_id,
        confirmation_url: responseData.confirmation_url,
      };
    }

    const confirmationUrl =
      responseData?.confirmation_url ??
      responseData?.payment?.confirmation?.confirmation_url ??
      responseData?.confirmation?.confirmation_url;

    if (typeof confirmationUrl === "string") {
      const paymentId =
        responseData?.payment_id ?? responseData?.payment?.id ?? responseData?.id;

      if (typeof paymentId === "string") {
        return {
          payment_id: paymentId,
          order_id: responseData?.order_id,
          confirmation_url: confirmationUrl,
        };
      }
    }

    throw new Error("Payment data not found in API response");
  }

  static async getPaymentStatus(
    paymentId: string
  ): Promise<PaymentStatusResult> {
    const response = await axiosInstance.get<PaymentStatusResult>(
      `/payment/status/${paymentId}`
    );

    return response.data;
  }

  static async getPaymentStatusByOrder(
    orderId: string
  ): Promise<PaymentStatusResult> {
    const response = await axiosInstance.get<PaymentStatusResult>(
      `/payment/status-by-order/${orderId}`
    );

    return response.data;
  }
}
