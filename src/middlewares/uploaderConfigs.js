const multer = require('multer');
const fs = require('fs')
const path = require('path')

exports.multerStorage = (destination, allowedTypes = /jpeg|jpg|png|webp/) => {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination)
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination)
        },
        filename: function (req, file, cb) {
            const uniqe = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const ext = path.extname(file.originalname)
            cb(null, `${uniqe}${ext}`)
        }
    })
    const fileFilter = function (req, file, cb) {
        if (allowedTypes.test(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'))
        }
    }
    const upload = multer({
        storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter
    })
    return upload
}