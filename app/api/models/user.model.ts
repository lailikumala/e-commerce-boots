import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  provider?: string;
  role?: string;
  id: string;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: {type: String, required: false},
  provider: {type: String, required: false},
  role: {type: String, required: false}
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;