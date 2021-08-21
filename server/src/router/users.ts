import { Router } from "express";
import User, { validateUser, validateLoginUser } from "../model/user";

const router = Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }

  let user = await User.findOne({ email: String(req.body.email) });
  if (user) {
    return res
      .status(400)
      .send({ error: `${user.email} already present. Try Loging in.` });
  }

  user = new User({ ...req.body });
  await user.hashPassword();
  await user.save();
  const token = user.generateAuthToken();
  return res.send({ data: token });
});

router.post("/login", async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }

  const user = await User.findOne({ email: String(req.body.email) });
  if (!user) {
    return res
      .status(400)
      .send({ error: `${req.body.email} does not present. Try Signing up.` });
  }

  const verified = await user.comparePassword(req.body.password);
  if (!verified) {
    return res.status(400).send({ error: "Wrong Password" });
  }

  const token = user.generateAuthToken();
  return res.send({ data: token });
});

export default router;
