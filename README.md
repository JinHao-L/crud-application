# Task B: CRUD Application

This repo consists of an implementation of a CRUD Application under the NUS CS3219 module.

## Technology
* Backend: NestJS

## Sub-tasks
There are 4 main sub-tasks for that this project aims to show

### B1: Implementing a simple backend.

Implement a simple backend and REST API to GET, POST, PUT, DELETE. You
may use any programming language of your choice.
Marking scheme

1. Successful GET, POST, PUT, DELETE API calls on localhost using Postman
2. Successful GET, POST, PUT, DELETE API calls to deployed endpoints using Postman
3. Some ability to handle common edge cases and error-resiliency. The deployed endpoint especially should not crash.

## B2: Testing through Continuous Integration (CI)

Write simple test cases for your designed API and use a CI tool (Travis, etc) to automate testing.

1. Successful testing for API using Mocha/Chai, or any other testing framework
2. Ability to use Travis or any other CI tool to automate testing, including the necessary instructions to run these tests

## B3: Deployment through Continuous Deployment (CD).

Integrate a CD tool for automated deployment to a serverless service.

## B4: Implement a frontend.

Build a frontend Single Page Application (SPA) using React, Vue or any 

1. Ability to interact with the API using the frontend
2. Implementation of style e.g. using Bootstrap

## F: Caching.

Implement a Redis cache to improve application performance. 

1. Successful GET request that retrieves a large amount of data from a local database.
2. Subsequent successful GET request to the same endpoint that demonstrates substantial performance improvement due to Redis caching.

## References
* https://github.com/hantsy/nestjs-rest-sample

## Acknowledgments
* CS3219 Module