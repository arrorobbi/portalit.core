import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'public'), // Path to save images
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
};
