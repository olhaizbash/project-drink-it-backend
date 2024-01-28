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

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.patch('/:id/users/info', authenticate, isValidId, ctrl.updateUser);

router.patch('/:id/dailynorma', authenticate, isValidId, ctrl.updateDailyNorma);

module.exports = router;