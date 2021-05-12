const express= require('express');
const { signUpValidator, validatorResult } = require('../middleware/validator');
const router = express.Router();
router.post('/signUp',signUpValidator,validatorResult);

module.exports =router;