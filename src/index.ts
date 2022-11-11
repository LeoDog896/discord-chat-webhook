import { WebhookClient } from "discord.js";
import { webhookURL } from "./config.js";
import consola from "consola";
import prompts from "prompts";

const webhookClient = new WebhookClient({ url: webhookURL });

consola.info("Webhook started!");

while (true) {
	// prompt the user for a message
	const response = await prompts({
		type: "text",
		name: "message",
		message: "Enter Message:",
	});

	if (!response) {
		continue;
	}

	// send the message
	await webhookClient.send(response.message);
}
