import axios from "axios";
import { IJournal, Journal } from "../types";
import { getToken } from "./auth";

const getAll = async (): Promise<Journal[]> => {
  try {
    const token = getToken();
    const res = await axios.get("/journal", {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);

    if (res.data?.message) {
      alert(res.data?.message);
    }
    console.log("got it", res);
    return res.data;
  } catch (er) {
    alert(er.response.data.message);
    return [];
  }
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
