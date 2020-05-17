const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/database");
const usersRoutes = require("./api/users/users.routes");
const bodyParser = require('body-parser');
const cors = require('cors');

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

const router = express.Router();
const app = express();

dotenv.config();
db();
app.use(cors());
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use("/api", router);
usersRoutes(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
