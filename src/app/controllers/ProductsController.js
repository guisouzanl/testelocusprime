import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      size: Yup.number().required(),
      quantity: Yup.number()
        .integer()
        .required(),
      type: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const productExist = await Product.findOne({
      where: { name: req.body.name },
    });

    if (productExist) {
      return res.status(400).json({ error: 'Product already exists!' });
    }

    const { name, price, size, quantity, type } = req.body;

    const stockTotal = quantity * price;

    const product = await Product.create({
      name,
      price,
      size,
      quantity,
      type,
      user_id: req.userId,
      storage_value: stockTotal,
    });

    return res.json(product);
  }

  async index(req, res) {
    const products = await Product.findAll({
      where: { user_id: req.userId },
    });

    return res.json(products);
  }
}

export default new ProductController();
