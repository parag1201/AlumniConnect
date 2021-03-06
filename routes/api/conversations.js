const router = require("express").Router();
const Conversation = require("../../models/Conversation");
const auth = require("../../middleware/auth");

//new conv

router.post("/", auth, async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	});

	try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get conv of a user

router.get("/:userId", auth, async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", auth, async (req, res) => {
	try {
		let conversation_obj = null;

		conversation_obj = await Conversation.findOne({
			members: {
				$all: [req.params.firstUserId, req.params.secondUserId],
			},
		});
		if (!conversation_obj) {
			const conversation = new Conversation({
				members: [req.params.firstUserId, req.params.secondUserId],
			});
			conversation_obj = await conversation.save();
		}
		res.status(200).json(conversation_obj);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
