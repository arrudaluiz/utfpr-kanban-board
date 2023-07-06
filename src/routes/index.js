import express from 'express';

import template from '../templates/index.js';
import sendMail from '../utils/sendMail.js';
import validator from '../utils/validator.js';

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

router.post('/send-email', async (req, res, next) => {
  try {
    const { error } = validator(req.body);
    const { name, email, subject, message } = req.body;
    const text = `Nome: ${name}\r\nE-mail: ${email}\r\nAssunto: ${subject}\r\nMensagem: ${message}`;
    const templateObj = {
      ...template.index,
      title: 'Mensagem enviada!',
      message:
        'Sua mensagem foi enviada e em breve responderemos em seu e-mail.'
    };

    if (error) {
      throw { message: error.message, status: 400 };
    }

    await sendMail(email, subject, text);

    res.render('mail-sent', templateObj);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
});

export default router;
