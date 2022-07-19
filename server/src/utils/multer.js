import path from 'path';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'src/public/uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);

      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
});

export { upload }