import express from 'express';

import template from '../templates/index.js';

const router = express.Router();

const templateObj = (obj) => {
  return { ...template.index, ...obj };
};

router.get('/', (req, res) => {
  res.render('login', templateObj(template.login));
});

router.get('/author', (req, res) => {
  res.render('author', templateObj(template.author));
});

router.get('/contact', (req, res) => {
  res.render('contact', templateObj(template.contact));
});

router.get('/project', (req, res) => {
  res.render('project', templateObj(template.project));
});

router.get('/techs', (req, res) => {
  res.render('techs', templateObj(template.techs));
});

export default router;
