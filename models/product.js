import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {

    title: { type: String, required: true },
    tag: { type: String, unique: true },
    author: { type: String, required: true },
    description: { type: String },

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },

    stock: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },

    category: { type: String, required: true },
    images: [{ type: String }],

    isNewArrival: { type: Boolean, default: false },
    isDiscounted: { type: Boolean, default: false },
    isTopSelling: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    specification: {
      title: { type: String },      
      author: { type: String },
      publisher: { type: String },
      isbn: { type: String },
      edition: { type: String },
      pages: { type: Number },
      country: { type: String },
      language: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);