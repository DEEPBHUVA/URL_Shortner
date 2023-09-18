const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/stasticRouter");
const URL = require("./model/url");
const app = express();
const PORT = 8001

//Connection
mongoose.connect("mongodb+srv://Deep:Deep123@cluster0.zr2z2sy.mongodb.net/url_shortner?retryWrites=true&w=majority")
.then(() => {
    console.log("Database connected successfully...");
})
.catch((err) => {
    console.log("Error:", err)
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
//Router

app.use("/", staticRoute);

app.use("/url", urlRoute);

app.get("/url/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry  = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {
                visitHistory: {
                    timestamps : Date.now()
                }
            }
        }
    );

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
})