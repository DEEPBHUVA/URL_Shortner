const express = require("express");
const {handlerGenerateNewUrlShortner, handlerGetAnalytics} = require("../controller/url");

const router = express.Router();

router.post("/", handlerGenerateNewUrlShortner);

router.get("/analytics/:shortId", handlerGetAnalytics); 

module.exports = router;