const grabLink = require('youtube-thumbnail-grabber')
const path = require("path")

const fileSystem = require('@cyclic.sh/s3fs')
const { http, https } = require('follow-redirects');


const download = async (url, path) => {

    https.get(url, (response) => {
        const { statusCode } = response;

        if (statusCode !== 200) {
            console.error(`Failed to download image: ${statusCode}`);
            return;
        }

        let imageData = '';
        response.setEncoding('binary');

        response.on('data', (chunk) => {
            imageData += chunk;
        });

        response.on('end', () => {
            fileSystem.writeFile(path, imageData, 'binary', (error) => {
                if (error) {
                    console.error(`Failed to save image: ${error}`);
                } else {
                    console.log(`Image downloaded to ${path}`);
                }
            });
        });

    }).on('error', (error) => {
        console.error(`Failed to download image: ${error}`);
    });
}

let destName = 0

const youtubeThumbnailDownload = async (req, res) => {
    // get youtube image url
    const url = grabLink(req.body.url, 'max')

    // set destination where save image
    const dest = path.join(__dirname, "..", "..", "tmp")
    const destRight = dest + destName + "techfans.jpg"
    destName = dest + 1

    await download(url, dest)
    if (destName !== 0) {
        fileSystem.unlink(dest + destName - 1 + "techfans.jpg")
    }

    res.download(dest, destName + "techfans.jpg")
}

module.exports = {
    youtubeThumbnailDownload
}