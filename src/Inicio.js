import express from 'express'
import {  producto } from './Managers/index.js'

const app= express()

const PORT = 8080

app.get("/products", async (req, res)=>{

    try {
    const { limit } = req.query

    const allProducts = await producto.getproducts();

    if(!limit || limit <1 ){
        return res.send({success: true, products: allProducts});
    }

    const products = allProducts.slice(0, limit);

    return res.send({success: true, products});

    } catch (error) {
        console.log(error)

        res.send({success: false, error: "Se ha producido un error"});
    }
    
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id: paramId } = req.params;
        const id = Number(paramId)

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        }
        const product = await producto.getProductById(id);

        if(!product.id){
            return res.send({success: false, error: "El producto no fue encontrado"})
        }

        res.send({success: true, product});
    
    } catch (error) {
        console.log(error)

        res.send({success: false, error: "Ha ocurrido un error"});
    }
});

app.listen(PORT, () => console.log(`Corriendo el servidor por el puerto ${PORT}`))