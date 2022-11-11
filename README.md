# discord-chat-webhook

an application that allows you to chat as a webhook programatically and interactively

Go to https://discord.com/api/oauth2/authorize?client_id=1040636269648158802&redirect_uri=https%3A%2F%2Flocalhost%3A5731&response_type=code&scope=rpc%20messages.read to begin.

## Configuration

The following ENV variables are required:

`WEBHOOK_URL` - the webhook url to send messages to

`CLIENT_SECRET` - the client secret of the application

`CLIENT_ID` - the client id of the application

`CHANNEL_ID` - the channel id to send messages to

<!-- TODO gif demonstration of how to retrieve theis -->
