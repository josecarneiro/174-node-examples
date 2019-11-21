'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

const multer = require('multer');
const cloudinary = require('cloudinary');
const storageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = storageCloudinary({
  cloudinary,
  folder: '174-test',
  allowedFormats: ['jpg', 'png']
});

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, '/tmp');
//   },
//   filename: (req, file, callback) => {
//     console.log(file);
//     callback(null, file.originalname);
//   }
// });

const uploader = multer({
  storage
});

router.post('/create', uploader.single('file-uploaded'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect('/');
});

module.exports = router;
