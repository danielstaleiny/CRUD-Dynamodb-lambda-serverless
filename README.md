# CRUD-Dynamodb-lambda-serverless
Crud example of simple dynamodb lambda serverless-offline. 

## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Run CRUD operation

check [http/rest.http](./http/rest.http) file


## Restclient

Emacs -> [Restclient](https://github.com/pashky/restclient.el)

VIM -> [Restclient](https://github.com/bounceme/restclient.vim)


## Serverless

Link -> [Serverless framework](https://serverless.com/)
