import { Router } from "express";
import User, { validateUser } from "../model/user";

const router = Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }

  let user = await User.findOne({ email: String(req.body.email) });
  if (user) {
    res
      .status(400)
      .send({ error: `${user.email} already present. Try Loging in.` });
  }

  user = new User({ ...req.body });
  await user.hashPassword();
  await user.save();

  const token = user.generateAuthToken();
  res.send({ data: token });
});

export default router;
