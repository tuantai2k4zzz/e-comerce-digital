const router = require("express").Router();
const ctrls = require("../controllers/user");
const {verifyAccessToken} = require('../middlewares/veryfyToken')

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/logout", ctrls.logout);
router.get('/current',verifyAccessToken, ctrls.getCurrent)
router.post('/refreshtoken',verifyAccessToken, ctrls.refreshAccessToken)


module.exports = router;