import express, {Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as UserController from './controllers/userController'

dotenv.config()
const app: Express = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

app.get('/user', UserController.getUsers)
app.post('/user', UserController.createUser)
app.patch('/user/:id', UserController.updateUser)
app.delete('/user/:id', UserController.deleteUser)

app.listen(port, () => {
  console.log(`server: server is running in port ${port}`)
})

