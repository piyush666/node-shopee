import express from "express";
import { signUp, login, removeUser } from "../controllers/auth";
import checkToken from "../middleWares/checkToken";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/delete/:userId", checkToken, removeUser);

router.get("/", (req, res, next) => {
  res.status(200);
  res.json({
    message: "IN auth router",
  });
});

export default router;
// module.exports = router;
