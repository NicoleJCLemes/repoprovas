import app from "./app.js";

const PORT: number = +process.env.PORT || 5000 
app.listen(PORT, () => console.log("The server is running on port " + PORT));