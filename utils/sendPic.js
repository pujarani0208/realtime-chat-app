const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },

    filename: function (req, file,cb) {
        cb(null, file.originalname)
    }

})

const upload = multer({
    storage: storage,
    limits: {fileSize: 100000000}
});
exports.picUpload = upload.fields([{name: 'photo', maxCount: 1},
                                {
                                    name: 'photos', maxCount: 8
                                }]);