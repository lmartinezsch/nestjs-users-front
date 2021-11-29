# NestJs Users frontend Authentication

## Description

This repository is a challenge made for The Lucky APP

## Getting started

This is the frontend of https://github.com/lmartinezsch/nestjs-users made by React.js.

### Prerequisites

---

- Install Docker Destop for Linux: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

- Install Docker Desktop for MAC: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

- Install Docker Desktop for Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)

- Install compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

```diff
- ¡¡¡IMPORTANT!!!

- You will need to run the api first https://github.com/lmartinezsch/nestjs-users

```

## Installation

Clone the repository in your projects folder and run the project with docker

```bash
$ git clone git@github.com:lmartinezsch/nestjs-users-front.git
```

## Running the app

```bash
$ cd nestjs-users-front
$ docker build -t nestjs-users-front:dev .
$ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 4040:4040 -e CHOKIDAR_USEPOLLING=true nestjs-users-front:dev
```

## Create a new User

Use http://localhost:4040/register for register a new user

## Login User

Use http://localhost:4040/login for loggin the user
