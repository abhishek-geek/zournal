import { Router } from "express";
import User, {
  validateUser,
  validateLoginUser,
  validateGoogleUser,
} from "../model/user";
import middleware from "../utils/middleware";

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
  return res.send({ token });
});

router.post("/google-signup", middleware.userExtractor, async (req, res) => {
  const au = req.user;
  console.log("au", au);

  if (au)
    return res
      .status(400)
      .send({ error: `${au.email} already present. Try Sign in.` });

  const { error } = validateGoogleUser(req.body);
  if (error) {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }

  // let user = await User.findOne({ email: String(req.body.email) });
  // if (user) {
  //   return res
  //     .status(400)
  //     .send({ error: `${user.email} already present. Try Loging in.` });
  // }

  const user = new User({ ...req.body });
  await user.save();
  const token = user.generateAuthToken();
  return res.send({ token });
});

router.post("/google-login", middleware.userExtractor, async (req, res) => {
  const { error } = validateGoogleUser(req.body);
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

  const token = user.generateAuthToken();
  return res.send({ token });
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  const { error } = validateLoginUser(req.body);
  if (error) {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }

  const user = await User.findOne({ email: String(req.body.email) });
  if (!user) {
    console.log(`${req.body.email} does not present. Try Signing up.`);
    return res
      .status(404)
      .send({ error: `${req.body.email} does not present. Try Signing up.` });
  }

  const verified = await user.comparePassword(req.body.password);
  if (!verified) {
    return res.status(401).send({ error: "Wrong Password" });
  }

  const token = user.generateAuthToken();
  // res.set("Authorization", token);
  return res.send({ token });
});

export default router;
