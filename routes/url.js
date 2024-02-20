const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const {handleGenerateShortUrl,handleGetAnalytics,handleGetShortUrl,handleGetAllUrls} = require('../controllers/url');

router.post("/generate",handleGenerateShortUrl);

router.get('/getAnalytics/:id', handleGetAnalytics);

router.get('/getShortUrl/:id', handleGetShortUrl);


router.post('/getAllUrls', handleGetAllUrls);

module.exports = router;