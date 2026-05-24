import express
from 'express';

import multer
from 'multer';

import path
from 'path';

import fs
from 'fs';

import {
  generateAssignment,
}
from '../controllers/assignment.controller';

const router =
  express.Router();

/* CREATE UPLOADS FOLDER */

const uploadPath =
  path.join(
    process.cwd(),
    'uploads'
  );

if (
  !fs.existsSync(
    uploadPath
  )
) {

  fs.mkdirSync(
    uploadPath,
    {
      recursive: true,
    }
  );

}

/* MULTER STORAGE */

const storage =
  multer.diskStorage({

    destination:
      (
        req,
        file,
        cb
      ) => {

        cb(
          null,
          uploadPath
        );

      },

    filename:
      (
        req,
        file,
        cb
      ) => {

        cb(

          null,

          Date.now() +
            '-' +
            file.originalname

        );

      },

  });

const upload =
  multer({

    storage,

    limits: {

      fileSize:
        10 *
        1024 *
        1024,

    },

  });

router.post(

  '/generate',

  upload.single('pdf'),

  generateAssignment

);

export default router;