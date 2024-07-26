<a id="readme-top"></a>
<!--
*** Thanks for reaching out to My Technical Test(Node.js) Project.
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Technical Test Node.js README</h3>

  <p align="center">
    Thank you for reading description of my project!
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
      <ul>
        <li><a href="#structure">Project Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#testing">Test using Jest</a></li>
    <li><a href="#Main points">Main Points on Each Task</a></li>
    <li><a href="#Swagger UI">Swagger UI(API Documentation)</a></li>
    <li><a href="#Accessible URLs">Accessible URLs</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is a complete example of a modern web application. It uses Yarn Workspaces and Lerna to manage multiple packages in one repository. The goal is to show best practices in web development, like setting up a scalable server, handling secure user authentication, adding real-time features, and more.

  * Purpose of the Project
  The main purpose of this project is to create a strong, scalable template for building web applications. It combines different technologies to make sure the app is easy to maintain, secure, and performs well. This project is a great resource for developers who want to learn and implement advanced features in their web apps.

  * Benefits of the Project
  This project has a modular structure, making it easy to manage and scale. It uses TypeScript for fewer errors and better code quality. The project includes secure authentication, real-time features, and comprehensive documentation to ensure reliability and ease of use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries/modules used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Node][Node.js]]
* [![Typescript][Typescript]]
* [![Fastify][Fastify]]
* [![Prisma][Prisma]]
* [![Lerna][Lerna]]
* [![Yarn][Yarn]]
* [![PostgreSQL][PostgreSQL]]
* [![WebSocket][Socket.io]]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### structure

Project Structure

    root/
    ├── node_modules/
    ├── packages/
    │   ├── api/
    │   │   ├── node_modules/
    │   │   ├── src/
    │   │   │   ├── controllers/
    │   │   │   │   ├── authController.ts
    │   │   │   │   ├── userController.ts
    │   │   │   │   ├── uploadController.ts
    │   │   │   ├── middleware/
    │   │   │   │   ├── authMiddleware.ts
    │   │   │   │   ├── roleMiddleware.ts
    │   │   │   ├── plugins/
    │   │   │   │   ├── samplePlugin.ts
    │   │   │   ├── routes/
    │   │   │   │   ├── authRoutes.ts
    │   │   │   │   ├── sampleRoute.ts
    │   │   │   │   ├── uploadRoutes.ts
    │   │   │   │   ├── userRoutes.ts
    │   │   │   ├── tests/
    │   │   │   │   ├── authController.test.ts
    │   │   │   │   ├── resetDatabase.ts
    │   │   │   ├── types/
    │   │   │   │   ├── fastify-jwt.d.ts
    │   │   │   │   ├── fastify-socketio.d.ts
    │   │   │   │   ├── fastify-multipart.d.ts
    │   │   │   ├── utils/
    │   │   │   │   ├── jwtHelper.ts
    │   │   │   ├── server.ts
    │   │   │   ├── prisma.ts
    │   │   ├── .env
    │   │   ├── package.json
    │   │   ├── tsconfig.json
    │   ├── services/
    │   │   ├── node_modules/
    │   │   ├── src/
    │   │   │   ├── index.ts
    │   │   ├── package.json
    │   │   ├── tsconfig.json
    │   ├── utils/
    │   │   ├── node_modules/
    │   │   ├── src/
    │   │   │   ├── index.ts
    │   │   ├── package.json
    │   │   ├── tsconfig.json
    ├── package.json
    ├── tsconfig.json
    ├── lerna.json


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an instruction of how you may set up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* yarn
  ```sh
  npm install --global yarn
  ```

## Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/bunnybumbum/TechnicalTest.git
   ```

2. Set Up Environment Variable: DATABASE_URL `packages/api/.env`
```js
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydatabase?schema=public"
```
You can change PostgreSQL username, password, port, database name.

3. Install NPM packages
   * yarn
      ```sh
      yarn install
      ```

      ```sh
      cd packages/api
      ```

      ```sh
      npx prisma generate
      ```

      ```sh
      npx prisma migrate deploy
      ```

      ```sh
      yarn dev
      ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Unit testing using Jest -->
## testing

You can test how well the web application runs using Jest in authController.test.ts.

   * Unit-testing(Jest)
      ```sh
      cd packages/api
      ```

      ```sh
      yarn test
      ```

  + CAUTION: In authController.test.ts, there are two parts of testing: Register testing and login testing.
  + About Register testing, you have to try to register a new user that not exist in database. If user already exist in database, you can get errors by Jest testing.
  + Whereas Login testing, you have to try to login an user that exist in database. If user doesn't exist in database, you can get errors by Jest testing.
  + You can see the results in the command line that run testing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Main Points on Each Tasks -->
## Main points

Task 1: Advanced Monorepo Setup
- How to Finish:
  * Initialize Yarn Workspaces.
  * Set up Lerna for managing packages.
  * Create separate packages for API, services, and utilities.
- Main Points:
  * Efficient management of multiple packages.
  * Shared dependencies and scripts.

Task 2: Advanced Server Setup
- How to Finish:
  * Set up a Fastify server with TypeScript.
  * Organize the codebase into controllers, middleware, plugins, and routes.
- Main Points:
  * Type safety with TypeScript.
  * Modular code organization.

Task 3: Advanced Database Integration with Prisma and PostgreSQL
- How to Finish:
  * Define Prisma models for User and Post.
  * Implement CRUD operations for users.
  * Handle relationships and data validation.
- Main Points:
  * Schema-driven development with Prisma.
  * Secure and efficient database operations.

Task 4: Authentication and Authorization
- How to Finish:
  * Set up JWT authentication with Fastify.
  * Create middleware for route authorization.
  * Secure routes based on user roles.
- Main Points:
  * Secure authentication with JWT.
  * Granular access control with roles.

Task 5: Advanced API Features
- How to Finish:
  * Implement file upload endpoint using Fastify Multipart.
  * Set up real-time notifications with Socket.IO.
- Main Points:
  * Efficient handling of file uploads.
  * Real-time updates and notifications.

Task 6: Testing and Documentation
- How to Finish:
  * Write unit tests using Jest.
  * Document the API using Swagger.
- Main Points:
  * Reliable code with unit tests.
  * Easy-to-use API documentation.

Task 7: Monorepo and Separate Packages
- How to Finish:
  * Ensure inter-package dependencies are managed correctly.
  * Demonstrate package updates and their impacts.
- Main Points:
  * Effective dependency management.
  * Consistency across packages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- API DOCUMENTATION -->
## Swagger UI

* Swagger UI(API DOCUMENTATION): http://localhost:3000/documentation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACCESSIBLE URLS -->
## Accessible URLs

The first step is to input the "Bearer token" into the Authorize button.(Fill out only "token string" without the prefix word "Bearer" into the gap.)

* GET: http://localhost:3000/greet?name={username}
* GET: http://localhost:3000/users
* POST: http://localhost:3000/users
  + Request body object template:
  + {
  +  "name": "username",
  +  "email": "username@example.com",
  +  "password": "123456"
  + }
* GET: http://localhost:3000/users/{id}
* PUT: http://localhost:3000/users/{id}
  + Request body object template:
  + {
  +  "name": "changedusername",
  +  "email": "changedusername@example.com",
  +  "password": "123456"
  + }
  +
  + CAUTION: It is possible to update and delete for someone who has only admin role.
* DELETE: http://localhost:3000/users/{id}
* POST: http://localhost:3000/register
  + Request body object template:
  + {
  +    "name": "username",
  +    "email": "username@example.com",
  +    "password": "123456",
  +    "role": "admin"(or "user")
  + }
* POST: http://localhost:3000/login
  + Request body object template:
  + {
  +    "email": "username@example.com",
  +    "password": "123456",
  + }
* POST: http://localhost:3000/upload
  + CAUTION: You can test uploading file in Postman(API DOCUMENTATION don't support testing upload files)
  + How to test in Postman: Body -> form-data -> Key: file, Type: File, Value: file location

  + In addition, WebSocket Testing: 
  + In Postman, 
  * Create new socketio request
  * You may set events: "userCreated", "userUpdated", "userDeleted"
  * Send ws://localhost:3001  

<!-- CONTACT -->
## Contact

  * My name - Ivan Zhyshko
  * My email address - ivanzhyshko804@gmail.com
  * My LinkedIn Profile Link: https://www.linkedin.com/in/ivan-zhyshko-a56989301/
  * Project Link: https://github.com/bunnybumbum/TechnicalTest.git

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[Node.js]: https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge
[Typescript]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge
[Fastify]: https://img.shields.io/badge/Fastify-000?logo=fastify&logoColor=fff&style=for-the-badge
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=for-the-badge
[Lerna]: https://img.shields.io/badge/Lerna-9333EA?logo=lerna&logoColor=fff&style=for-the-badge
[Yarn]: https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=fff&style=for-the-badge
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge
[Socket.io]: https://img.shields.io/badge/Socket.io-010101?logo=socketdotio&logoColor=fff&style=for-the-badge