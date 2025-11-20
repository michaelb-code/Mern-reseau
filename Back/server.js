const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const cors = require("cors");//protege et sécurise les requetes HTTP

const app = express();

//CORS
const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methode: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOption));

app.use(bodyParser.json());//permet de lire le body
app.use(bodyParser.urlencoded({ extended: true }));//permet de lire les url
app.use(cookieParser());//permet de lire les cookies

//JWT
app.use("/", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    if (res.locals.user) {
        res.status(200).json({ userId: res.locals.user._id });
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
});


// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// SERVER
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
}) 
