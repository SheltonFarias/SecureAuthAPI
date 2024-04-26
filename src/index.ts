import express from 'express'
import { routes } from '@/routes/routes';
var cors = require('cors')
const app = express()

app.use(express.json());

app.use(cors({
	origin: '*',
	methods:'GET, PUT, POST, DELETE'
}))

app.use(routes)

app.listen(3000, () => {
  console.log('Server on: http://localhost:3000 ON!')
})