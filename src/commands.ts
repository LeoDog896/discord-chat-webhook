import type { WebhookClient } from "discord.js";
import { Message } from "./rpc";

interface Command {
	name: string;
	execute: (client: WebhookClient, message: Message, args: string[]) => Promise<void>;
}

export const commands: Command[] = [
	{
		// when a ping is sent, send back a pong
		name: "ping",
		execute: async (client) => {
			await client.send("pong");
		}
	},
	{
		// when hello is sent, send back "Hello, {usenrname}!"
		name: "hello",
		execute: async (client, message) => {
			await client.send(`Hello, ${message.author.username}!`);
		}
	}
]
