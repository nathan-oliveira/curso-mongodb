const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../constants/env');

const User = require('../models/user');

// register and user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const checkIfFieldsAreEmpty = name == null
      || email == null
      || password == null
      || confirmPassword == null;
    
    if (checkIfFieldsAreEmpty) throw new Error('Por gentileza, preencha todos os campos!');
    if (password !== confirmPassword) throw new Error('As senhas não conferem!');

    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error('O e-mail informado já está em uso!');
    
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });
  
    const newUser = await user.save();
    const token = jwt.sign({
      name: newUser.name,
      id: newUser._id,
    }, SECRET_TOKEN);

    res.status(200).json({
      error: null,
      msg: 'Você realizou o cadastro com sucesso!',
      token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error('Não há um usuário cadastrado com este e-mail!');

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new Error('E-mail ou Senha inválida!');

    const token = jwt.sign({
      name: user.name,
      id: user._id,
    }, SECRET_TOKEN);

    res.status(200).json({
      error: null,
      msg: 'Você está autenticado!',
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
})

module.exports = router;