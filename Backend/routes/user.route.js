const express = require("express");
const {Home, userRegister, signIn, logOut} = require("./../controllers/auth.controller");
const router = express.Router();
const {auth} = require("./../middlewares/auth")


router.get('/', Home);
router.post('/u/userRegister', userRegister);
router.post('/u/signIn', signIn);
router.get('/u/logOut', auth, logOut);

module.exports = router;