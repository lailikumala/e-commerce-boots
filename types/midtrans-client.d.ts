declare module 'midtrans-client' {
  interface MidtransConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface ItemsDetails {
        name: string,
        price: number,
        quantity: number,
  }

  interface TransactionParameters {
    transaction_details: TransactionDetails;
    item_details?: ItemsDetails;
  }

  export class Snap {
    constructor(config: MidtransConfig);
    createTransaction(parameters: TransactionParameters): Promise<{
      token: string;
      redirect_url: string;
    }>;
    createTransactionToken(parameters: TransactionParameters): Promise<string>;
  }

  export class CoreApi {
    constructor(config: MidtransConfig);
    charge(parameters: TransactionParameters): Promise<any>;
    // Add other methods as needed
  }
}