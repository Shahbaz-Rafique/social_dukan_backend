const multer = require("multer");

// Set up storage for multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = { upload };
