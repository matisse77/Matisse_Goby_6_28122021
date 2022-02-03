const multer = require('multer');

// Allowed file extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// Configuration of multer: contains the logic of where to save the incoming file
const storage = multer.diskStorage({
  //destination: tells multer where the image should be stored
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //filename: file naming
  filename: (req, file, callback) => {
    // Keep the original name of the file by replacing spaces with underscores
    const name = file.originalname.split(' ').join('_');
    // Resolve the appropriate file extension
    const extension = MIME_TYPES[file.mimetype];
    // Add a timestamp to the file name with Date.now()
    callback(null, name + Date.now() + '.' + extension);
  },
});
// Export of configured multer element / .single() indicates handling only uploaded images
module.exports = multer({ storage }).single('image');
