import { axiosInstance } from "../../shared/lib/axiosInstance";

export class PaymentApi {
    static async createPayment(data){
        const response = await axiosInstance.post('/payment', data);
        const url = response.data.confirmation_url;
        
        return url; 
    }
}