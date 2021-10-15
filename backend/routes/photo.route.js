const express = require('express');
const router = express.Router();

const { getPhotos, addPhotos } = require('./../controllers/photo.controller');
const { upload } = require('./../helpers/photohelper');

router.get('/get', getPhotos);

router.post('/add',upload.array('files'), addPhotos);

module.exports = router