const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const app = express();
const uuid4 = require('uuid4');
require('dotenv').config()
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

connectDB();

const PORT = process.env.PORT || 5000;

// init middleware for parsing
app.use(express.json({ extended: false }));



app.get("/", (req, res) => res.send("API is running"));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/requests", require("./routes/api/request"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/extras", require("./routes/api/extras"));

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "AWARDS",
	},
});

const upload = multer({ storage: storage });

app.use(cors());

app.post("/upload-image", upload.single("file"), function (req, res) {
	console.log("inside image route")
	res.json(req.file.path);
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
