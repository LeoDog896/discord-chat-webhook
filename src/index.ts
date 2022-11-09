import { WebhookClient } from "discord.js";
import { webhookId, webhookToken } from "./config";

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });