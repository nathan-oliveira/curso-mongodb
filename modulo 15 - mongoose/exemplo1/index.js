const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Estamos conectados ao MongoDB!');
});

// Criar schema
const pessoaSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  profissao: String,
});

// Criar Model
const Pessoa = mongoose.model('Pessoa', pessoaSchema);

const nathan = new Pessoa({
  nome: 'Nathan',
  idade: 23,
  profissao: 'Programador',
});

nathan.save(function (err) {
  if (err) {
    console.log(err);
  }
});

// Encontrando dados

Pessoa.findOne({ nome: "Nathan" }, function (err, pessoa) {
  if (err) console.log(err);
  console.log(pessoa);
});

Pessoa.insertMany([
  {
    nome: 'Fulano',
    idade: 23,
    profissao: 'Advogado',
  },
  {
    nome: 'Ciclano',
    idade: 23,
    profissao: 'Advogado',
  },
]);

async function getAllFromPessoas() {
  const pessoas = await Pessoa.find({}).exec();
  console.log(pessoas);
}
getAllFromPessoas();

// Deletar registro
async function getByNameFromPessoas(nome) {
  const pessoa = await Pessoa.find({ nome }).exec();
  if (pessoa.length === 0) {
    console.log('Está pessoa não existe!');
  } else {
    console.log(pessoa);
  }
}

getByNameFromPessoas('Ciclano');
Pessoa.deleteOne({ nome: 'Ciclano' });
getByNameFromPessoas('Ciclano');

Pessoa.updateOne({ nome: 'Fulano' }, { profissao: "Juiz" }).exec();
getByNameFromPessoas('Fulano');

// Utilizando Where

async function getPessoaNomeIdade(nome, idade) {
  const pessoa = await Pessoa
    .where('idade').gte(idade)
    .where('nome').gte(nome)
    .exec();
  
  if (pessoa.length === 0) {
    console.log('Está pessoa não existe!');
  } else {
    console.log(pessoa);
  }
}

getPessoaNomeIdade('Nathan', 23) 