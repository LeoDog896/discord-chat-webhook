import { WebhookClient } from "discord.js";
import { webhookURL } from "./config";
import consola from "consola"

consola.info("Webhook started!")

const webhookClient = new WebhookClient({ url: webhookURL });
