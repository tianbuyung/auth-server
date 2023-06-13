# Simple Auth Application

This application was developed using Postgresql (Database) with Sequelize (ORM), Express.js (backend) and Ejs (frontend). Additionally, you can try it out in your local environment by following the instructions below:

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Project Setup

1. Clone this repo

   ```sh
   git clone https://github.com/tianbuyung/simple-auth-application.git
   ```

2. Mount the directory using terminal.

   ```sh
   cd simple-auth-application
   ```

3. Install dependencies via terminal

   ```sh
   npm install
   ```

## Customize configuration

Create `.env` file in root project directory with contents according to the example (see [.env.example](/.env.example)) ensure you fill `NODE_ENV`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` & `JWT_SECRET_KEY` with your own data

### Compile for Development

```sh
npm run dev
```

### Compile for Production

```sh
npm run start
```
