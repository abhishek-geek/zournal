import { Router } from "express";
import { Schema } from "mongoose";
import Journal, { IJournal, validateJournal } from "../model/journal";

const router = Router();

router.get("/", async (req, res) => {
  const user = req.user;
  console.log("user in get", user);

  if (!user) {
    console.log("login");

    return res.status(400).send({ message: `Login first` });
  }
  const journals = await Journal.find({
    author: user._id as Schema.Types.ObjectId,
  });
  return res.send(journals);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  if (!user) {
    return res.status(400).send({ message: `Login first` });
  }
  const journal = await Journal.findById(id);
  if (!journal) {
    return res.status(404).send({ message: `Entry not found` });
  }
  return res.send(journal);
});

router.post("/", async (req, res) => {
  const { error } = validateJournal(req.body);
  if (error) {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }
  const user = req?.user;

  if (!user) {
    return res.status(400).send({ message: `Login first` });
  }
  console.log(req.body.date);
  //   const dd = new Date();
  const dd = new Date(req.body.date);
  console.log(dd);

  const journal: IJournal = new Journal({
    date: dd,
    content: String(req.body.content),
    author: String(user.id),
  });
  await journal.save();
  return res.send(journal);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { error } = validateJournal(req.body);
  if (error) {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }
  const user = req?.user;

  if (!user) {
    return res.status(400).send({ message: `Login first` });
  }

  const journal = {
    date: req.body.date as Date,
    content: req.body.entry as string,
    author: user._id as Schema.Types.ObjectId,
  };
  const updatedJournal = await Journal.findByIdAndUpdate(id, journal, {
    new: true,
  });
  if (!updatedJournal) {
    return res.status(404).send({ message: `Entry not found` });
  }
  await updatedJournal.save();
  return res.send(updatedJournal);
});

export default router;
