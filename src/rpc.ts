import { clientId, clientSecret, channelID, prefix } from "./config.js";
import consola from "consola";
import RPC from "discord-rpc";
import { commands } from "./commands.js";
import type { WebhookClient } from "discord.js";

// from https://discord.com/developers/docs/topics/rpc#messagecreatemessageupdatemessagedelete
export interface Message {
	id: string,
	blocked: boolean,
	content: string,
	/* parsed content as a JSON object */
	content_parsed: any,
	/* hex code, ex #ffffff */
	author_color: string,
	edited_timestamp: string | number, // ??
	/* A UTC timestamp such as 2016-07-05T04:30:50.776Z */
	timestamp: string,
	/* Whether to read the timestamp in TTS (text-to-speech) */
	tts: boolean,
	mentions: any[],
	mention_roles: any[],
	mention_everyone: boolean,
	embeds: any[],
	attachments: any[],
	type: number,
	pinned: boolean,
	author: {
		id: string,
		username: string,
		discriminator: string,
		avatar: string,
		bot: boolean
	}
}

const scopes = ["rpc", "messages.read"];
const client = new RPC.Client({ transport: "ipc" });

client
	.login({
		clientId,
		scopes,
		clientSecret,
		redirectUri: "http://localhost:6842",
	})
	.catch((e) => {
		consola.error("RPC Error:", e);
		process.exit(1);
	});

// create promise that resolves when the client is ready
export const ready = new Promise<void>((resolve) => {
	client.on("ready", () => {
		consola.info("Logged in as", client.application?.name);
		consola.info("Authed for user", client.user?.username);

		// listen to messages
		client.subscribe("MESSAGE_CREATE", { channel_id: channelID });
		resolve();
	});
});

export function listen(webhook: WebhookClient, callback: (message: string) => void) {
	client.on("MESSAGE_CREATE", async ({ message }) => {
		callback(message.author.username + ": " + message.content);

		if (message.content.startsWith(prefix)) {
			commands.find((command) => message.content.startsWith(prefix + command.name))?.execute(webhook, message, message.content.slice(prefix.length).split(" "));
		}
	});
}
