const shortid = require('shortid');
const URL = require("../models/url")

async function handleGenerateShortUrl(req, res) {
    try {
        const body = req.body;
        console.log(req.body, "*******BODY*******");
        if (!body.url) {
            return res.status(400).json({ message: "url is required" })
        }
        const shortId = shortid();
        await URL.create({ shortId, redirectUrl: req.body.url, visitHistory: [], email: req.body.email });
        // return res.render('home', { shortId })
        return res.send({ shortId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.id;
    const entry = await URL.findOne({ shortId });
    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory
    })

}
async function handleGetShortUrl(req, res) {
    try {
        const id = req.params.id;
        const entry = await URL.findOneAndUpdate(
            {
                shortId: id
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),

                    },
                },

            }
        );
        console.log(JSON.stringify(entry));
        if (!entry) {
            // If no entry found with the given shortId
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Redirect to the original URL
        res.redirect(entry.redirectUrl);
    } catch (error) {
        // Handle errors
        console.error('Error handling short URL request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetAllUrls(req, res) {
    try {
        const email = req.body.email;
        const urls = await URL.find({ email });
        return res.send(urls)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
    handleGetShortUrl,
    handleGetAllUrls
}
