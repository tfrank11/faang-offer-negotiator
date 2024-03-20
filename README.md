# FAANG Offer Negotiator

[Live Site](https://faang-negotiatior.web.app/)

![website](https://i.imgur.com/Vp1VrRP.png)

This is the frontend for the GPT4 FAANG Offer Negotiator site.

## High Level Overview

- The purpose of the game is to negotiate the highest TC you can against a GPT4 AI
- The GUI consists of the game itself, a landing page, and an authentication page
- It talks to Firebase directly for authentication and to read the number of tokens the user has for display purposes.
- It hits the API for creating, reading, and sending messages to GPT threads
- It hits the API to generate Stripe payment links

## Project Setup

### Install deps and run

```
yarn install
yarn dev
```

