import { WebhookClient } from "discord.js";
import { webhookURL, clientId, clientSecret } from "./config.js";
import consola from "consola";
import prompts from "prompts";
import RPC from "discord-rpc";

{
	const scopes = ["rpc", "messages.read"];

	const client = new RPC.Client({ transport: "ipc" });

	client.on("ready", () => {
		consola.info("Logged in as", client.application?.name);
		consola.info("Authed for user", client.user?.username);
	});

	await client.login({ clientId, scopes, clientSecret }).catch((e) => {
		consola.error("RPC Error:", e);
		process.exit(1);
	});
}

{
	const webhookClient = new WebhookClient({ url: webhookURL });

	consola.info("Webhook started!");

	while (true) {
		// prompt the user for a message
		const response = await prompts({
			type: "text",
			name: "message",
			message: "Enter Message:",
		});

		if (!response.message) {
			process.exit(0);
		}

		if (!response.message.trim()) {
			continue;
		}

		// send the message
		await webhookClient.send(response.message);
	}
}
