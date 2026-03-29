const aiRouter = require("express").Router();
const AiController = require("../controllers/Ai.controller");

aiRouter.get("/history", AiController.getChatHistory);
aiRouter.post("/chat", AiController.sendMessage);

module.exports = aiRouter;
