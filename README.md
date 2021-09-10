# Task B: CRUD Application

[![Heroku](https://heroku-badge.herokuapp.com/?app=notekeeper-3219)](https://notekeeper-3219.herokuapp.com/) [![Netlify Status](https://api.netlify.com/api/v1/badges/0b44592d-3876-4cfb-a4b6-47f300e96304/deploy-status)](https://app.netlify.com/sites/notekeeper-3219/deploys) [![CircleCI](https://circleci.com/gh/JinHao-L/crud-application.svg?style=shield&circle-token=f5d0b6e666d3c15968bfb48c7cdc7dfa15f35cf3)](https://circleci.com/gh/JinHao-L/crud-application)  

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/KDr-eam/workspace/notekeeper/overview)

This repo consists of an implementation of a CRUD Application under the NUS CS3219 module.

# NoteKeeper
A [note service](https://notekeeper-3219.netlify.app/) for you to share notes publicly 


## Sub-tasks
There are 4 main sub-tasks for that this project aims to show

### B1: Implementing a simple backend.

Implement a simple backend and REST API to GET, POST, PUT, DELETE. You
may use any programming language of your choice.
Marking scheme

1. Successful GET, POST, PUT, DELETE API calls on localhost using Postman
2. Successful GET, POST, PUT, DELETE API calls to deployed endpoints using Postman
3. Some ability to handle common edge cases and error-resiliency. The deployed endpoint especially should not crash.

### B2: Testing through Continuous Integration (CI)

Write simple test cases for your designed API and use a CI tool (Travis, etc) to automate testing.

1. Successful testing for API using Mocha/Chai, or any other testing framework
2. Ability to use Travis or any other CI tool to automate testing, including the necessary instructions to run these tests

### B3: Deployment through Continuous Deployment (CD).

Integrate a CD tool for automated deployment to a serverless service.

### B4: Implement a frontend.

Build a frontend Single Page Application (SPA) using React, Vue or any 

1. Ability to interact with the API using the frontend
2. Implementation of style e.g. using Bootstrap

## C: Authorization & Authentication
### Authentication
Passport module
- Local strategy for username/password login
  - Bcrypt for secure one-way salted hash
JWT
- Use `@nestjs/jwt` for JWT manipulation
- Use `passport-jwt` for JWT strategy
Authentication Guard 
- to prevent unauthenticated access to `/notes` and `/users` endpoints

### Authorization
Role-based access control:
- Implemented by assigning roles `admin || user` to users
- Only user with 'admin' role can access `GET /users` endpoint to see list of users

### Attribute-based access control:
- Implemented using [CASL](https://casl.js.org/) library
- User has read-only access to all notes
- User can update or delete their own notes
- User can create new note
- Admin can manage (create/read/update/delete) all notes

## Tech Stack
* Backend: NestJS
* Frontend: ReactJS with Tailwind CSS

## References
* https://github.com/hantsy/nestjs-rest-sample
* https://tailwindcss.com/docs
* https://tailwindcomponents.com/
* https://docs.nestjs.com/security/authentication

## Acknowledgments
* CS3219 Module