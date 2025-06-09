import fs from 'fs';
import multer from 'multer';
import path from 'path';

export const profilePicturesDirectory = path.join(__dirname, '..', '..', 'profile-pictures');
fs.mkdirSync(profilePicturesDirectory);

export const uploadProfilePictures = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, profilePicturesDirectory),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix);
    }
  })
});
