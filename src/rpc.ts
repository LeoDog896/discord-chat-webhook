import { clientId, clientSecret, channelID } from "./config.js";
import consola from "consola";
import RPC from "discord-rpc";

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

export function listen(callback: (message: string) => void) {
	client.on("MESSAGE_CREATE", async ({ message }) => {
		callback(message.author.username + ": " + message.content);
	});
}
