const router = require('express').Router();
const bcrypt = require('bcrypt');

const verifyToken = require('../helpers/check-token');

const getUserByToken = require('../helpers/get-users-by-token');

const User = require('../models/user');

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { password: 0 }
    );

    if (!user) throw new Error('O usuário não encontrado!');

    return res.json({
      error: null,
      user,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const token = req.header('auth-token');
    const user = await getUserByToken(token);

    const { id: userReqId, name, email, password, confirmPassword } = req.body;

    const userId = user._id.toString();
    if (userId !== userReqId) throw new Error('Acesso negado!');

    const updateData = { name, email };

    if (password !== confirmPassword) throw new Error('As senhas não conferem!');
    if (password === confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      updateData.password = passwordHash;
    }

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true });
    return res.json({
      error: null,
      msg: 'Usuário atualizado com sucesso!',
      data: updatedUser,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;