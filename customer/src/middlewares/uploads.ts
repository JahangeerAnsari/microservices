// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'photos');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const upload = multer({ storage }).array('images', 5); 