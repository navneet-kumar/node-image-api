const sharp = require('sharp');
const fs = require('fs');
const outputDir = "output"
const defaultOptions = {
    width: 100,
    height: 100,
    fit: sharp.fit.inside,
    withoutEnlargement: true
};

class ImageResizer {
    static async resize(image, resizeOptions = defaultOptions) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        return await sharp(image.path).resize(defaultOptions).toFile(
            `${outputDir}/${image.filename}.${image.mimetype.substr(image.mimetype.indexOf("/") + 1)}`);
    }
}

module.exports = {ImageResizer, outputDir};