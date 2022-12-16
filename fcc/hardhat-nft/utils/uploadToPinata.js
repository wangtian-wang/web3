require("dotenv").config()
const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")
const pinataApiKey = process.env.PINATA_API_KEY || ""
const pinataApiSecret = process.env.PINATA_API_SECRET || ""
if (!pinataApiKey || !pinataApiSecret) {
    console.warn("something bad happend in uploadToPinata")
    return
}
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)
const storeImages = async (imgPath) => {
    const fullImgPath = path.resolve(imgPath)
    const files = fs.readdirSync(fullImgPath).filter((file) => file.includes(".png"))

    let response = []
    for (const fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(`${fullImgPath}/${files[fileIndex]}`)
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            },
        }
        try {
            await pinata
                .pinFileToIPFS(readableStreamForFile, options)
                .then((result) => {
                    response.push(result)
                })
                .catch((err) => {
                    console.log("错误发生❎", err)
                })
        } catch (e) {
            console.log("错误发生❎❎", e)
        }
    }
    return { response, files }
}
const storeTokenUriMetadata = async (metadata) => {
    const options = {
        pinataMetadata: {
            name: metadata.name,
        },
    }
    try {
        const response = await pinata.pinJSONToIPFS(metadata, options)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}

module.exports = {
    storeImages,
    storeTokenUriMetadata,
}
