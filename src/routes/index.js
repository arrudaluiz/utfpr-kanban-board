import express from 'express';

import template from '../templates/index.js';
import sendMail from '../utils/sendMail.js';

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

router.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const text = `Nome: ${name}\r\nE-mail: ${email}\r\nAssunto: ${subject}\r\nMensagem: ${message}`;
    const templateObj = {
      ...template.index,
      title: 'Mensagem enviada!',
      message: 'Sua mensagem foi enviada e em breve responderemos em seu e-mail.'
    };

    await sendMail(email, subject, text);

    res.render('mail-sent', templateObj);
  } catch (error) {
    console.error('Error sending email:', error);
    next(error);
  }
});

export default router;
