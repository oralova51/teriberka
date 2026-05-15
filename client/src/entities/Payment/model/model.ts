export type Payment = {
    id: number;
    payment_id: string;
    status: string;
    amount: number;
    confirmation_url: string;
    recipient_account_id: number | string;
    createdAt: Date;
    updatedAt: Date;
  };
  