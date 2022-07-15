const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let villas = [
  {
    id: 0,
    nom: "First villa",
    description: "Teste sur les données, exemple de description d'une villa",
    lieux: "42 New York street",
    prix: 200,
  },
  {
    id: 1,
    nom: "First villa",
    description: "Teste sur les données, exemple de description d'une villa",
    lieux: "42 New York street",
    prix: 200,
  },
];

let client = [];

const generateVillaId = () => {
  const maxId = villas.length > 0 ? Math.max(...villas.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send(" <h1>Home page server</h1> ");
});

app.get("/api/villas", (request, response) => {
  response.json(villas);
});

app.get("/api/client", (request, response) => {
  response.json(client);
});

app.post("/api/villas", (request, response) => {
  const body = request.body;

  if (!body.nom && !body.description && !body.lieux && !body.prix) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const villa = {
    id: generateVillaId(),
    nom: body.nom,
    description: body.description,
    lieux: body.lieux,
    prix: body.prix,
  };

  villas = villas.concat(villa);

  response.json(villa);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
