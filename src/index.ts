import { WebhookClient } from "discord.js";
import { webhookId, webhookToken } from "./config";
import consola from "consola"

consola.info("Webhook started!")

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });
