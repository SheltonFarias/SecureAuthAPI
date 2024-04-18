import express from 'express'
import { routes } from './routes/routes';

const app = express()

app.use(express.json());

app.use(routes)

app.listen(3000, () => {
  console.log('Server on: http://localhost:3000 ON!')
})