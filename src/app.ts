// Créer un serveur express
import express from "express";
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded());

// Lance le serveur express sur le port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`mini application écoute sur le port : ${port}`);
})