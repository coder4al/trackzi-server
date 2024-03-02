const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
require("./database/db");
const authRoutes = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/task", taskRouter);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Route all requests to the index.html file in the 'dist' directory
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT; // Use the PORT environment variable if set, otherwise use port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// localhost: 4000 / auth / register;
// const port = 4000;

// app.listen(port, () => {
//   console.log(`server is running on port`, port);
// });
