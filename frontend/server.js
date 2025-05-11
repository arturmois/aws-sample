import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World from frontend");
});

const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
