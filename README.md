# ddd-infrastructure-typescript
It provide the basic imported way about infrastructure and basic DDD template when you want to build your project with Typescript and Node.js.

# Background

# How to Use

# DDD Layer Structure with using domain

# Structure

- domain: The abstract interfaces for DDD Application.
- infrastructure: the infrastructure components integrations, database, governance, message queue,etc.
- env.example: the recommended env config for the infrastructure

# Dependency

- uuid: a package is used to generate unique id
- lodash: a general package to handle the problem
- mongoose: a mongoose option is include in RequestContext, so that the session can be passed into multiple separate server projects

# In the future: ddd-backend-nodejs-scaffold 

- [ ] graphql service with supporting request to graphql, grpc and http
- [ ] http service with supporting request to graphql, grpc and http
- [ ] grpc service with supporting request to graphql, grpc and http

# Reference