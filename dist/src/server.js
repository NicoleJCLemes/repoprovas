import app from "./app.js";
var PORT = +process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("The server is running on port " + PORT); });
