import express from "express";
const productRouter = express.Router();

productRouter.use(express.static('public'));

// Instancie le controller
import { productController } from "../controllers/productController";
const products = new productController;

productRouter.get('/', async (req, res) => {
    let page = Number(req.query.page);
    if (!Number.isSafeInteger(page)) { page = 0 };

    const name = req.query.nom !== undefined ? String(req.query.nom).trim() : "";
    const ref = req.query.ref !== undefined ? String(req.query.ref).trim() : "";
    const sort = String(req.query.ordre).trim();
    const redirect = req.query.redirect;

    const result = await products.getProducts(page, name, ref, sort);

    res.render('products/list.pug', { result, name, ref, sort, redirect });
})

productRouter.get('/nouveau', async (req, res) => {
    res.render('products/new.pug');
})

productRouter.post('/nouveau', async (req, res) => {
    const ref = req.body.ref;
    const name = req.body.name;
    const manufacturer = req.body.manufacturer;
    const quantity = Number(req.body.quantity);
    products.createProduct(ref, name, manufacturer, quantity);
    res.redirect(`/produits/${ref}`);
})

productRouter.get('/:ref', async (req, res) => {
    let ref = req.params.ref;
    const product = await products.getUniqueProduct(ref);
    res.render('products/detail.pug', { product });
})

productRouter.get('/edit/:ref', async (req, res) => {
    const ref = req.params.ref;
    const product = await products.getUniqueProduct(ref);
    res.render('products/edit.pug', { product });
})

productRouter.post('/edit/:ref', async (req, res) => {
    const oldRef = req.params.ref;
    const newRef = req.body.newRef;
    const name = req.body.name;
    const manufacturer = req.body.manufacturer;
    const quantity = Number(req.body.quantity);
    await products.updateProduct(oldRef, newRef, name, manufacturer, quantity)

    res.redirect(`/produits/${newRef}`);
})

productRouter.post('/delete', async (req, res) => {
    const ref = req.body.ref;
    const name = req.body.name;
    await products.deleteProduct(ref)
    res.redirect(`/produits?redirect=${name} supprimé avec succès`)
})

export { productRouter };