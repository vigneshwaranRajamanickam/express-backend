const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

let products = [
  {
    "id": "1716553437114",
    "name": "ice cream cake",
    "price": "899",
    "description": "To construct your ice cream cake, you'll be alternating layers of ice cream with cake, or with crumbled cookies, or even with dessert sauces like chocolate or butterscotch. When making an ice cream cake, it's essential to work quickly, so that the ice cream doesn't melt",
    "image": "/uploads/1716553437126-20784-ice-cream-cake-ddmfs-step-4x3-49b3ca7af5074beeb60c02bd6f569624.png"
},
{
    "id": "1716553470882",
    "name": "red velvet cake",
    "price": "799",
    "description": "Red velvet cake is, at its core, a cocoa-based cake in which using vinegar, baking soda, and buttermilk give the cake a smooth, tightly crumbed texture with a subtle, tangy flavor",
    "image": "/uploads/1716553747443-Red_Velvet_Cake_03.jpg"
},
{
    "id": "1716553513625",
    "name": "cheese cake",
    "price": "999",
    "description": "cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items",
    "image": "/uploads/1716553513632-cheese cake.jpg"
},
{
    "id": "1716553552688",
    "name": "Black forest cake",
    "price": "499",
    "description": "Black Forest gateau consists of several layers of chocolate sponge cake sandwiched with whipped cream and cherries. It is decorated with additional whipped cream, maraschino cherries, and chocolate shavings.",
    "image": "/uploads/1716553552695-download (2).jpg"
},
{
    "id": "1716553593978",
    "name": "white forest cake",
    "price": "550",
    "description": "White forest is nothing but vanilla sponge cake soaked with sugar water and topped with white chocolate and cream. Delicious when served cold. I made this entirely eggless, you can use any of my sponge cake recipe in this. I will soon share a sponge cake with eggs in them.",
    "image": "/uploads/1716553593986-download (3).jpg"
},
{
    "id": "1716553635075",
    "name": "plum cake",
    "price": "150",
    "description": "After 1830 plum cake was often referred to as fruit cake or black cake. In 1885, in a description of plum cake that sounds like plum pudding, it was described as \\\"mucilaginous\\\" (gluey) – a solid, dark-colored, thick cake with copious amounts of plums, gritty notes from raisins",
    "image": "/uploads/1716553635082-download (4).jpg"
},
{
    "id": "1716553682297",
    "name": "Strawberry cake",
    "price": "699",
    "description": "Strawberry cake is a cake that uses strawberry as a primary ingredient.[3] Strawberries may be used in the cake batter, atop the cake, and in the frosting. Strawberry cakes are typically served cold.",
    "image": "/uploads/1716553682304-download (5).jpg"
},
{
    "id": "1716553718240",
    "name": "rasamalai cake",
    "price": "1499",
    "description": "Rasmalai is a popular Indian dessert that originates from the state of Bengal. It is a delightful sweet made from soft and spongy cottage cheese dumplings, also known as 'rasgullas', which are soaked in a luscious, creamy, and aromatic milk syrup flavored with cardamom and saffron",
    "image": "/uploads/1716553718247-images (1).jpg"
}
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a single product by ID
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  res.json(product);
});
// Add a new product
app.post('/products', upload.single('image'), (req, res) => {
  // Increment the currentId before using it for a new product  
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description:req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : '',
  };
  products.push(product);
  res.status(201).json(product);
});


// Update an existing product
app.put('/products/:id', upload.single('image'), (req, res) => {
  const productId = req.params.id 
  const productIndex = products.findIndex(p => p.id === productId); 
  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const updatedProduct = {
    ...products[productIndex],
    name: req.body.name,
    price: req.body.price,
    description:req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : products[productIndex].image,
  };
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  products = products.filter(p => p.id !== productId); 
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

