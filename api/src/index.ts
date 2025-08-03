import express from 'express'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from TypeScript backend!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
