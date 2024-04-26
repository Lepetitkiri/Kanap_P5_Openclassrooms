import express from 'express';
const router = express.Router();

import productCtrl from '../controllers/product';

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/order', productCtrl.orderProducts);

module.exports = router;