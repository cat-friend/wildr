# Wildr

<a href="https://dpl-wildr.herokuapp.com/">Live Site</a>  |  <a href="https://github.com/cat-friend/wildr"> Project Wiki</a> | <a href="https://github.com/cat-friend/wildr/issues">Report Bug</a>

Wildr, a project inspired by [Flickr], is a wildlife photo sharing platform that allows users to
publicly share images and can be viewed by other users. This website was designed as a Week 16 project as part of App Academy's 24-week Full-Stack Software Engineering Bootcamp.

## Technologies Used
[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  | [Node.js](https://nodejs.org/en/)  |  [PostgreSQL](https://www.postgresql.org/)   |  [Sequelize](sequelize.org)   |  [React](https://reactjs.org/)   |   [Redux](https://redux.js.org/)  |  [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

## Launching Locally

### Prerequisites
 - [Node.js 16.13.1](https://nodejs.org/en/)
 - [PostgreSQL 12](https://www.postgresql.org/docs/12/index.html)

### Getting Started

1. Clone the project repository
```
   git clone https://github.com/cat-friend/wildr
```
2. Install dependencies
```
    npm install
```

3.  In the `/backend` directory, create a local .env file modeled after the `.env.example` file.
```
   PORT=5000
   DB_USERNAME=<<username>>
   DB_PASSWORD=<<password>>
   DB_DATABASE=wildr_db
   DB_HOST=localhost
   SESSION_SECRET=<<JWT token>>
```
* note:  if you change the port for the backend server, be sure to update the proxy in `/frontend/package.json`:
```
"proxy": "http://localhost:5000"
```
4. Migrate and seed the database
 ```
   npx dotenv sequelize db:create
   npx dotenv sequelize db:migrate
   npx dotenv sequelize-cli db:seed:all
```

5. In the `/frontend` and `/backend` directories, start the servers with the script `npm start`. The front- and backend servers must be running in order for the application to work.

## Wildr In Action
Full user stories for the initial development phase are available on the [User Stories & Features Acceptance Criteria](https://github.com/cat-friend/wildr/wiki/User-Stories-&-Features-Acceptance-Criteria) section of the project wiki.

### User Registration and Authentication
New users can register for an account by entering a unique email address, a unique username, and a secure password.
