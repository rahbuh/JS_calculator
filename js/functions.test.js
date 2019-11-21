// const add = require("./functions.js")
import { add } from "./functions.js";

test("Adding 2 and 3 should equal 5", () => {
  expect(add(2, 3)).toBe(5);
});
