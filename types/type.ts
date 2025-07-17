export interface IProduct {
  image: string;
  _id: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface ITransaction {
  order_id: string;
  transaction_date: string;
  status: string;
  amount: number;
  payment_type: string;
}