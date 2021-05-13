const express= require('express');
const { signUpController,signInController } = require('../controllers/auth');
const { signUpValidator,signInValidator, validatorResult } = require('../middleware/validator');
const router = express.Router();
router.post('/signUp',signUpValidator,validatorResult,signUpController);
router.post('/signIn',signInValidator,validatorResult,signInController);

module.exports =router;