// modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// routes
const authRouter = require('./routes/authRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const partyRouter = require('./routes/partyRoutes.js');

// middleware

// config
const dbName = "partytimeb";
const port = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// conexão mongodb
mongoose.set('strictQuery', false);
mongoose.connect(
  `mongodb://localhost/${dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// atrelar as rotas no express
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/party', partyRouter);

app.get('/', (req, res) => {
  res.json({
    version: '1.0',
  });
});

app.listen(port, () => console.log(`[+] Server On - http://localhost:${port}`));