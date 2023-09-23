# Local Setup

To contribute you will first need to fork the repo and make some adjustments to get it up and running on your local machine. Below are the steps to follow for you to get LogDrop to run on your local machine.

### 1. Create a `.env` file

Provide your values as needed.

### 2 Configure your database

You can either use a local database or a Docker container to run your database.
Use either 2.a or 2.b for the next step.

### 2.a Local Database

Create a new database with your postgres client and add the configuration url to your env

### 2.b Local Database (using Docker)

Starting the docker container

```bash
docker compose up -d
```

### 3. Create a new GitHub OAuth Application

[Follow this link][new-oauth] to create a new app filling the following required
details on creation:

```
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

Once completed, you will be redirected to the application page settings, from
there create the client secret by clicking on `Generate a new client secret`
button.

Next, copy the client secret generated and the client ID into the `.env` file,
replacing `<client_id>` and `<client_secret>`, respectively:

```
GITHUB_ID=<client_id>
GITHUB_SECRET=<client_secret>
```

### 4. Install dependencies

Use `npm` to install dependencies.

```
npm install
```

### 5. Running the dev server

Finally, you can run the dev server:

```
npm run dev
```
