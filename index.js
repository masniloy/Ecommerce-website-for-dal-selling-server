const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://dall:Of6FvN07CeEwsrKg@cluster0.nv6lbgx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const ProductCollection = client.db('Dal').collection('Product');
        const CartCollection = client.db('Dal').collection('CartProduct');
        const OrderCollection = client.db('Dal').collection('OrderProduct');

        app.get('/Products', async (req, res) => {
            //get the value from server
            const quary = {}
            const cursor = ProductCollection.find(quary);
            const Products = await cursor.toArray();
            res.send(Products);

        });

        app.get('/Products/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: new ObjectId(id) };
            const Product = await ProductCollection.findOne(quary);
            res.send(Product);
        });


        app.post('/CartProduct', async (req, res) => {                          //post the value on server
            const product = req.body;
            const result = await CartCollection.insertOne(product);
            res.send(result);
        });

        app.get('/CartProduct', async (req, res) => {                  //get the value from server
            const quary = {}
            const cursor = CartCollection.find(quary);
            const result = await cursor.toArray();
            res.send(result);

        });

        app.get('/CartProduct/:email', async (req, res) => {
            const email = req.params.email;
            const quary = { email: email };
            const Product = CartCollection.find(quary);
            const result = await Product.toArray();
            res.send(result);

        });

        app.delete('/CartProduct/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: new ObjectId(id) };
            const Product = await CartCollection.deleteOne(quary);
            res.send(Product);
        });



        app.post('/OrderProduct', async (req, res) => {                          //post the value on server
            const product = req.body;
            const result = await OrderCollection.insertOne(product);
            res.send(result);
        });


        app.get('/OrderProduct/:email', async (req, res) => {
            const email = req.params.email;
            const quary = { email: email };
            const Product = OrderCollection.find(quary);
            const result = await Product.toArray();
            res.send(result);

        });



    }

    finally {


    }
}
run().catch(err => connsole.error(err));



app.get('/', (req, res) => {
    res.send("Node Server Running");
});

app.listen(port, () => {
    console.log(`Server Running on : ${port}`);
});