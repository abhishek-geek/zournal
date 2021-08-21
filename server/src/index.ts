import app from "./app";
import { connectMongo } from "./services/mongo";
import { PORT } from "./utils/config";

void (async (): Promise<void> => {
  await connectMongo();
  console.log(`connected to mongodb on port ${PORT}`);
})();

app.listen(PORT, () => {
  console.log(`connecting to port ${PORT}...`);
});
