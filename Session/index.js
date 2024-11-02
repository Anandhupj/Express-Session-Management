const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.get("/set-name", (req, res) => {
  const userName = req.query.name || "Guest";
  req.session.userName = userName;
  res.send(`Session initialized with name: ${userName}`);
});

app.get("/get-name", (req, res) => {
  if (req.session.userName) {
    res.send(`Hello,${req.session.userName}! Welcome back.`);
  } else {
    res.send(
      "No session data found.Please visit '/set-name' to initialize the session"
    );
  }
});
app.listen(PORT, () => {
  console.log("Server running on port : ", PORT);
});
