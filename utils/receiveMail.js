require("dotenv").config();
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

module.exports = receiveMail = (emailOptions, cb) => {
	const auth = {
		auth: {
			api_key: process.env.MAILGUN_API_KEY,
			domain: process.env.MAILGUN_DOMAIN,
		},
	};
	
	const transporter = nodemailer.createTransport(mailGun(auth));

	transporter.sendMail(emailOptions, function (err, data) {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data);
		}
	});
};
