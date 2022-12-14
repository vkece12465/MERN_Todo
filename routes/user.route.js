const express = require("express");
const router = express.Router();

const {Home, userRegister, signIn, logOut} = require("./../controllers/auth.controller");

router.get('/', Home);
router.post('/u/userRegister', userRegister);
router.post('/u/signIn', signIn);
router.post('/u/logOut', logOut);

export default router;