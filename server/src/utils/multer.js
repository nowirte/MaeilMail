import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: "ap-northeast-2"
})

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read-write',
    bucket: 'elice-everymail',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async (req, file, cb) => {
      console.log('in multer:', file)
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext)
    }
  })
})

export { upload }