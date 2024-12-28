const express = require("express");
const path = require("path");

const app = express();
const port = 8081;

app.use("/app", express.static(path.resolve(__dirname, "../dist")));
app.get("/app/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
	console.log(`Admin server listening on port:${port}`);
});
