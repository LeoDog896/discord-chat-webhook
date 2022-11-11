import { WebhookClient } from "discord.js";
import { webhookURL, clientId, clientSecret, channelID } from "./config.js";
import consola from "consola";
import prompts from "prompts";
import RPC from "discord-rpc";
import blessed from "blessed"

{
	const scopes = ["rpc", "messages.read"];

	const client = new RPC.Client({ transport: "ipc" });

	client.on("ready", () => {
		consola.info("Logged in as", client.application?.name);
		consola.info("Authed for user", client.user?.username);

		// listen to messages
		client.subscribe("MESSAGE_CREATE", { channel_id: channelID });
	});

	client.on("MESSAGE_CREATE", async ({ message }) => {
		consola.info(message.author.username + ":", message.content);
	});

	await client.login({ clientId, scopes, clientSecret, redirectUri: "http://localhost:6842" }).catch((e) => {
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
