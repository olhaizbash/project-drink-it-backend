const express = require('express');

const ctrl = require('../../controllers');

const router = express.Router();

const { validBody, authenticate, upload, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/userModel');

router.post('/register', validBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/avatar', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.patch('/info/:id', authenticate, isValidId, validBody(schemas.updateUserSchema), ctrl.updateUser);

router.patch('/dailynorma/:id', authenticate, isValidId, ctrl.updateDailyNorma);

module.exports = router;
