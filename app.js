const express = require("express");
const path = require("node:path");
const indexRouter = require("./routers/indexRouter");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);

app.use((err, req, res, next) => {
  console.error(`Oops there seems to be a problem: ${err}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
