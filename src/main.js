// @ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 5000

app.use('/', async (req, res, next) => {
  console.log('Middleware 1')

  const fileContent = await fs.promises.readFile('.gitignore')

  const requestedAt = new Date()

  // @ts-ignore
  req.requestedAt = requestedAt
  // @ts-ignore
  req.fileContent = fileContent
  next()
})

/* 수 많은 middleware 들... */

app.use((req, res) => {
  console.log('Middleware 2')

  res.send(
    // @ts-ignore
    `Hello, express!: Requested at ${req.requestedAt}, ${req.fileContent}`
  )
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
