const shortid = require('shortid')
const URL = require("../model/url");    

async function handlerGenerateNewUrlShortner(req, res){
    const shortID = shortid.generate();
    const body = req.body;
    if(!body.url){
        return res.status(400).json({ msg : "Url is required" });
    }

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [], 
    });

    return res.render("Home", {
        id : shortID
    })
}

async function handlerGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handlerGenerateNewUrlShortner,
    handlerGetAnalytics
}