import express from 'express'
import { routes } from '@/routes/routes'
import { storage } from './services/multerConfig'
import multer from 'multer'


const upload = multer({ storage: storage })
const cors = require('cors')

const app = express()

app.post("/upload", upload.single('file'), (req, res) => {
	return res.json(req.file.filename);
})

app.use(express.json());

app.use(cors({
	origin: '*',
	methods: 'GET, PUT, POST, DELETE'
}))

app.use(routes)

app.listen(3000, () => {
	console.log('Server on: http://localhost:3000 ON!')
})