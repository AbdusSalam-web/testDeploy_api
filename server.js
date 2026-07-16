const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const database = require("./utils/db");
const AuthRouter = require("./routes/authRoute");
const ServiceRouter = require("./routes/serviceRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const AdminRouter = require("./routes/adminRoute");
// variables
const app = express();
const Port = port || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", AuthRouter);
app.use("/api/data", ServiceRouter);

// admin route
app.use("/api/admin", AdminRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome.");
});

database().then(() => {
  app.listen(Port, () => {
    console.log(`App is listening on the Port: ${Port}`);
  });
});
