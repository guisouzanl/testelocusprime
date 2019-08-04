import * as Yup from 'yup';
import Sale from '../schemas/Sale';
import Product from '../models/Product';
import User from '../models/User';

class SaleController {
  async store(req, res) {
    const schema = Yup.object().shape({
      quantity_sold: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const product = await Product.findByPk(req.params.id);
    const user = await User.findByPk(req.userId);

    const { quantity_sold } = req.body;
    const invoice = quantity_sold * product.price;

    if (!product) {
      return res.status(401).json({ error: 'Product not found!' });
    }

    if (product.user_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to sell this product!' });
    }

    if (product.quantity >= quantity_sold) {
      await Sale.create({
        product_id: product.id,
        quantity_sold,
        invoice_value: invoice,
        user_id: req.userId,
      });

      const { quantity } = product;

      const newQuantity = quantity - quantity_sold;
      const newStockValue = product.storage_value - invoice;

      const productUpdated = await product.update({
        quantity: newQuantity,
        storage_value: newStockValue,
      });

      const newCash = user.cash + invoice;

      const userUpdated = await user.update({
        cash: newCash,
      });

      console.log(userUpdated);

      return res.json(productUpdated);
    }

    return res
      .status(401)
      .json({ error: 'You dont have this quantity on this product!' });
  }

  async index(req, res) {
    const sales = await Sale.find({
      user_id: req.userId,
    });

    return res.json(sales);
  }
}

export default new SaleController();
