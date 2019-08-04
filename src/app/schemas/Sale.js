import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
    },
    quantity_sold: {
      type: Number,
      required: true,
    },
    invoice_value: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Sale', SaleSchema);
