import express from "express";

const app = express();
/** Parses JSON data in a request automatically */
app.use(express.json());

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
