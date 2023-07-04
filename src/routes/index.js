import express from 'express';

import { main, index } from '../templates/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { ...main, ...index });
});

router.get('/author', (req, res) => {
  res.render('author');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/project', (req, res) => {
  res.render('project');
});

router.get('/techs', (req, res) => {
  res.render('techs');
});

export default router;
