const multer = require('multer');

const MIME_TYPES_MAP = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/covers');
  },
  filename: (req, file, cb) => {
    // const ext = MIME_TYPES_MAP[file.mimetype];
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const isValid = !!MIME_TYPES_MAP[file.mimetype];
  let error = isValid ? null : new Error('Invalid mime type');
  cb(error, isValid);
};

const fileUpload = multer({
  storage,
  fileFilter,
  limits: 500000,
});

module.exports = fileUpload;
