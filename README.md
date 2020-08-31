# Feeling IFFI Events

This application allows the users to create, edit, delete and view snippets of code.
This API stores the information about an user and its respective resoures. It allows users to create, update, view and delete snippets of their own resources.

This application allow the users to create, edit, delete, RSVP and view events. This API stores the information about an user and its respective resources. t allows users to create, update, view, delete and RSVP events of their own resources.

## Important Links
- [Feeling-IFFI Client Repo](https://github.com/Feeling-IFFE/event-iffe-client)
- [Feeling-IFFI  API Repo](https://github.com/Feeling-IFFE/event-iffe-api)
- [Deployed-Feeling IFFI API](https://safe-escarpment-74500.herokuapp.com)
- [Deployed-Feeling IFFI Client Application](https://feeling-iffe.github.io/event-iffe-client/)

## API URL
    production: 'https://safe-escarpment-74500.herokuapp.com',
    development: 'http://localhost:4741'

## API End Points

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/events`              | `events#index`    |
| POST   | `/event`               | `event#create`    |
| GET    | `/events/:id`          | `events#show`     |
| DELETE | `/events/:id`          | `events#delete`   |
| PATCH  | `/events/:id`          | `events#update`   |
| GET    | `/userevents`          | `userevents#show` |
| PATCH  | `/events/:id`          | `events#update`   |
| POST   | `/events/:id/rsvp`     | `rsvp#create`     |


All data returned from API actions is formatted as JSON.

## API Routers
- User routes
- Events routes

## Resources and Attributes

The resource for the application is events. The user will be able to create events and RSVP. The user will have access to RSVP and create events as soon he logs into the website.

## Technologies

- Mongo DB
- Mongoose
- Ajax
- JSON
- Node.JS
- Passport

## Planning Store


This application came to life after expending time looking at different websites and ways of communication. Since it is a group project, we decided to create something that people can create events and invite others to these events. This application will allow users to create, edit, view, and delete events and give the possibilities to RSVP to events on the website.

#### The process:
This application uses authentication and allows users to create resources inside the website. During the process of development, several tools were used to bring this API to live. Ajax/Axios , Mongoose, Express, Passport, and more. The application contains a robust back-end with validations for the user accounts.

#### Problem Solving:

This application solves the problem of not having a place to host events and invite others. Also, allow other users to create events and communicate through an online medium.

## User Stories

- As a user I want to sign in/up.
- As a user I want to Create a new < resource >.
- As a user I want to Read multiple < resources >.
- As a user I want to Update a < resource > I own.
- As a user I want to Delete a < resource > I own.
- As a user I want to RSVP a < resource > I own.
- As a user I want to RSVP a < resource > that others own.

## ORM Database
![Image of Database](https://i.imgur.com/gFKClZG.png)

## Disclaimer

This API may be reset or altered at anytime. The future of this API may not align with the current state and therefore the state your client application expects. If you would like to maintain a version of this API in its current state for your future use, please fork and clone the repository and launch it on heroku.
## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
