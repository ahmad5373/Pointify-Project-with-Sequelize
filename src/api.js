"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cors = require("cors");
const routes_1 = require("./pointify/routes");

const serverless = require("serverless-http");
const corsConfig = {
	optionsSuccessStatus: 200,
};
const app = express();
const router = express.Router();
//
var multer = require("multer");
var forms = multer();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(__dirname + "/public"));

app.use(express.json({ limit: "100mb" }));
app.use(forms.array());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(cors(corsConfig));
routes_1.pointifyRoutes(app);

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`server is running on PORT ${PORT}`);
});

//# sourceMappingURL=api.js.map
