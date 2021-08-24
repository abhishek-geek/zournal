import axios from "axios";
import { IJournal, Journal } from "../types";
import { getToken } from "./auth";

const getAll = async (): Promise<Journal[]> => {
  const token = getToken();
  const res = await axios.get("/journal", {
    headers: {
      Authorization: token,
    },
  });
  console.log("got it", res);
  return res.data;
};

const post = async (journal: IJournal) => {
  const token = getToken();
  const res = await axios.post("/journal", journal, {
    headers: {
      Authorization: token,
    },
  });
  console.log("got it", res);
  return res.data;
};

const journalService = { getAll, post };

export default journalService;
