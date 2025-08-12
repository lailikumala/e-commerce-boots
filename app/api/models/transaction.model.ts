import mongoose, {Document} from "mongoose";

export interface ITransaction extends Document {
  order_id: string;
  transaction_date: string;
  status: string;
  amount: string;
  payment_type: string;
}

const TransactionSchema = new mongoose.Schema({
  order_id: { type: String, required: true},
  transaction_date: { type: String, required: true},
  status: {type: String, required: true},
  amount: {type: String, required: true},
  payment_type: {type: String, required: true}
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;