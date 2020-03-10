const express = require("express");
const app = express();

const multer = require("multer");
const upload = multer({dest: "uploads/"});

const Q = require("./src/queue")
const response = require("./src/modals/response");
const fs = require('fs');

function validate(file) {
    console.log("validating file object")
    let response = false;
    if (!file) {
        console.log("file object not provided.")
    } else {
        let validType = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg"];
        if (validType.indexOf(file.mimetype) > -1) response = true;
        else console.log(`MIME type '${file.mimetype}' not supported, supported MIME type - ${validType}`)
    }
    return response;
}

app.post("/resize", upload.single("image"), (req, res) => {
    let status = validate(req.file)

    if (status) {
        status = new Q().getInstance().enqueueJob(req.file);
    }

    let reply = new response();
    reply.status(status);
    if (status) {
        reply.successMessage("Request queued successfully");
        reply.downloadUrl = `${req.protocol}://${req.get('host')}/download/${req.file.filename}.${req.file.mimetype.substr(req.file.mimetype.indexOf("/") + 1)}`;
    } else reply.errorMessage("failed to queue request");
    res.send(reply);
});

app.get("/download/:id", (req, res) => {
    let documentId = req.params.id;
    let imagePath = `${__dirname}/output/${documentId}`;
    documentId = documentId.match("^[a-z0-9]*")[0];

    if (documentId.length !== 32 || !fs.existsSync(imagePath)) {
        res.send({"error": "No such image exists, if you have requested recently please wait until results are generated."});
    } else {
        res.download(imagePath);
    }
});

module.exports = app;