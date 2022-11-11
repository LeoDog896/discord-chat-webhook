import { WebhookClient } from "discord.js";
import { webhookURL } from "./config.js";
import blessed from "blessed";
import { listen, ready } from "./rpc.js";

await ready;

const webhookClient = new WebhookClient({ url: webhookURL });

const screen = blessed.screen({
	smartCSR: true,
});

const messageList = blessed.list({
	align: "left",
	mouse: true,
	keys: true,
	width: "100%",
	height: "80%",
	top: 0,
	left: 0,
	border: {
		type: "line",
	},
	scrollbar: {
		ch: " ",
		// TODO inverse: true
	},
	items: [],
});

const input = blessed.textarea({
	bottom: 0,
	width: "100%",
	height: "20%",
	inputOnFocus: true,
	padding: {
		top: 1,
		left: 2,
	},
	style: {
		fg: "#787878",
		bg: "#454545",

		focus: {
			fg: "#f6f6f6",
			bg: "#353535",
		},
	},
});

input.key(["escape", "C-c"], () => {
	process.exit(0);
});

input.key("enter", () => {
	webhookClient.send(input.getValue())
	input.setValue("");
});

screen.append(messageList);
screen.append(input);
input.focus();

screen.render();

listen(webhookClient, (message) => {
	messageList.addItem(message);
	messageList.scrollTo(100);
	screen.render();
});
