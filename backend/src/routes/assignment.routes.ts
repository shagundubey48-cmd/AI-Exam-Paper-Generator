import express from 'express';

import multer from 'multer';

import {
  generateAssignment
} from '../controllers/assignment.controller';

const router =
  express.Router();

const upload =
  multer({
    dest: 'uploads/',
  });

router.post(

  '/generate',

  upload.single('file'),

  generateAssignment

);

export default router;