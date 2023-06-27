import dotenv from "dotenv"
import express from 'express';

dotenv.config({ path: ".env" })
const PORT = process.env.PORT

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
