import path from 'path';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'src/uploads/');
    },
    filename(req, file, cb) {
      console.log('in multer:', file)
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
});

export { upload }