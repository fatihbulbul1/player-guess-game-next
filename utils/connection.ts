import mongoose, { Model } from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URI as string)
    .catch((err) => console.log(err));
  console.log("Mongoose connected");

  const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    points: {
      type: Number,
      default: 0,
    },
  });

  const PUsers = mongoose.models.PUsers || mongoose.model("PUsers", UserSchema);

  return { conn, PUsers };
};
