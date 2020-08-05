const multer = require('multer')
const express = require('express')
const router = express.Router()
const foodController = require('../controllers/fooditem')

/**
 * File upload Handling
 * */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        req.fileUplaodFailed = true;
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/', upload.single('img'), foodController)

router.get('/:id', foodController)

router.put('/:id', upload.single('img'), foodController)

router.delete('/:id', foodController)

module.exports = router
