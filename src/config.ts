import dotenv from "dotenv";
import consola from "consola";

function assertNotNull(name: string): string {
	// Not suspectible to prototype pollution -- no user input sent to retrieve .env
	const env = process.env[name];
	if (env) {
		return env;
	}

	consola.error(
		`ENV: ${name} not found! Make sure to specify it as an enviornment variable, secrets, or in .env`
	);
	process.exit(1);
}

dotenv.config();

export const webhookURL = assertNotNull("WEBHOOK_URL");
