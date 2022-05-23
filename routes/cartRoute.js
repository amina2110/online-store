const express = require("express");
const CartController = require("../controllers/CartController");
const router = express.Router();

router
    .route("/")
    .get((req, res) => res.render("../views/cart.ejs", {
        isEmpty: true,
        name: '',
        img: '',
        cost: '',
        owner: '',
    }))

router.get('/', CartController.findAll);
router.get('/:name', CartController.findOne);
router.post('/', CartController.create);
router.patch('/:name', CartController.update);
router.delete('/:name', CartController.destroy);

module.exports = router;
