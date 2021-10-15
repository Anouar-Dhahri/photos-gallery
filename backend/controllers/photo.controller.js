const Photos = require('./../models/photo');

const getPhotos = async(req, res, next) => {
    try {
        const photos = await Photos.find();
        res.status(200).send(photos);
    } catch(error) {
        res.status(500).send(error);
    }
}

const addPhotos = async(req, res, next) => {
    try {
        let photosArray = [];
        req.files.forEach(element => {
            const photo = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            photosArray.push(photo);
        });
        const photos = new Photos({
            title: req.body.title,
            files: photosArray 
        });
        await photos.save();
        res.status(200).send("Photos Uploaded Successfully");
    } catch(error) {
        res.status(500).send(error);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    getPhotos,
    addPhotos
}