import dotenv from 'dotenv';
import express from 'express';
import mustacheExpress from 'mustache-express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import router from './routes/index.js';
import template from './templates/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: '.env' });
const PORT = process.env.PORT;

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use((req, res, next) => {
  const templateObj = {
    ...template.index,
    title: 'Página não encontrada',
    message: 'Não encontramos a página que você tentou acessar.'
  };
  res.status(404).render('error', templateObj);
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  const templateObj = {
    ...template.index,
    title: 'Erro na solicitação',
    message:
      'Não conseguimos realizar sua solicitação. Tente novamente mais tarde.'
  };
  res.status(500).render('error', templateObj);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
