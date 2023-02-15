// @ts-check

/* eslint-disable no-console */

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()
app.use(bodyParser.json())

const PORT = 5000

const USERS = {
  15: {
    nickname: 'foo',
  },
}

userRouter.get('/', (req, res) => {
  console.log(1)
  res.send('User list')
})

userRouter.param('id', (req, res, next, value) => {
  console.log(2)
  console.log(value)

  // @ts-ignore
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  console.log(3)
  console.log('User info with ID')

  // @ts-ignore
  res.send(req.user)
})

userRouter.post('/', (req, res) => {
  console.log(4)
  // Register user
  res.send('User registered')
})

userRouter.post('/:id/nickname', (req, res) => {
  console.log(5)
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
