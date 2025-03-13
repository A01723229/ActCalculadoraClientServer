const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

app.post("/calculate", (req, res) => {
  let { num1, num2, operation } = req.body;

  num1 = Number(num1);
  num2 = Number(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid numbers provided." });
  }

  let result;
  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        return res.status(400).json({ error: "Division by zero is not allowed." });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: "Invalid operation." });
  }

  res.json({ result });
});
