import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    hashtags: { type: [String], default: [] },
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema);
