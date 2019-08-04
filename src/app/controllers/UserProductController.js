import * as Yup from 'yup';
import Product from '../models/Product';

class UserProductController {
  async index(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (product.user_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to see this product' });
    }

    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      size: Yup.number(),
      quantity: Yup.number().integer(),
      type: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const product = await Product.findByPk(req.params.id);

    if (product.user_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to edit this product!' });
    }

    const { name, quantity, price, size, type } = req.body;

    if (name !== product.name) {
      const productExist = await Product.findOne({
        where: { name: req.body.name },
      });

      if (productExist) {
        return res.status(400).json({ error: 'Product already exists!' });
      }
    }

    const stockTotal = quantity * price;

    const productUpdated = await product.update({
      name,
      quantity,
      price,
      size,
      type,
      storage_value: stockTotal,
    });

    return res.json({
      productUpdated,
    });
  }
}
export default new UserProductController();
