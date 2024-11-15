const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json());

const rootRouter = require('./routes/index')

app.use('/api/v1', rootRouter)

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})