const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const saveFile = async (files) => {
    const { tempFilePath } = files.img
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    return secure_url;
}
const deleteFile = async (img) => {
    const nombreArr = img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);
}

module.exports = {
    saveFile,
    deleteFile
}