# FAANG Offer Negotiator

[Live Site](https://www.salary-gpt.com/)

This is the frontend for the GPT4 FAANG Offer Negotiator site.

## High Level Overview

- The purpose of the game is to negotiate the highest TC you can against a GPT4 AI
- It talks to Firebase directly for authentication and to read the number of tokens the user has for display purposes.
- It hits the API for creating, unlocking, reading, and sending messages to GPT threads
- It hits the API to generate Stripe payment links

## Project Setup

### Install deps and run

```
yarn install
yarn dev
```
