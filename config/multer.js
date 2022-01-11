const express = require("express")
const router = express.Router();
const authCtrl = require('../controlors/authCtrl')
const multer = require("multer")
const path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        var filetypes = /pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }

    // mypic is the name of file attribute
})
module.exports = upload