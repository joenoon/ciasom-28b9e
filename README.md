# Ciasom Exercise

**Runs on Google/Firebase Cloud Functions - requires node 6.11.5**

## Server

#### Development

```
cd functions
yarn install # <-- first time
yarn run dev
ngrok http 8080 # <-- in another terminal
```

Endpoint is hard-coded. Change accordingly.

#### Production/Deployment

```
cd functions
yarn run deploy
```

## Expo App

```
xde expo
```
