import express from 'express'
import { routes } from '@/routes/routes'
import path from 'path';

const cors = require('cors')

const app = express()

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.json());

app.use(cors({
	origin: '*',
	methods: 'GET, PUT, POST, DELETE'
}))

app.use(routes)

app.listen(3000, () => {
	console.log('Server on: http://localhost:3000 ON!')
})