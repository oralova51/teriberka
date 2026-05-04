import { axiosInstance } from "../../shared/lib/axiosInstance";

export class PaymentApi {
  static async createPayment(data) {
    const response = await axiosInstance.post("/payment", data);
    const { data: responseData } = response;

    if (typeof responseData === "string") {
      return responseData;
    }

    if (typeof responseData?.confirmation_url === "string") {
      return responseData.confirmation_url;
    }

    if (typeof responseData?.payment?.confirmation?.confirmation_url === "string") {
      return responseData.payment.confirmation.confirmation_url;
    }

    if (typeof responseData?.confirmation?.confirmation_url === "string") {
      return responseData.confirmation.confirmation_url;
    }

    throw new Error("Payment URL not found in API response");
  }

  static async getNotification(){
    
  }
}
