const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const landingRoutes = require("./routes/landing");
const aboutRoutes = require("./routes/about");
const serviceRoutes = require("./routes/services");
const personnelRoutes = require("./routes/personnels");
const cors = require("cors");

const port = process.env.PORT || 8080;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("~DB Connection Successful~");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/personnels", personnelRoutes);

app.listen(port, () => {
  console.log(`****Backend Server Running on port ${port}****`);
});
