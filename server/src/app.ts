import cors from "cors";
import express from "express";

import appConfig from "./config";

import chatRouter from "./routes/chat";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: appConfig.ALLOWED_ORIGINS,
  })
);

app.get("/_status", (req, res) => {
  res.send("OK");
});

app.use("/api", chatRouter);

app.listen(appConfig.PORT, () => {
  console.log(`Server is running on port ${appConfig.PORT}`);
});
