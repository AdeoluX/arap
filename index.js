const express = require('express')

// basic setup
const server = express()
const PORT = parseInt(process.env.PORT) || 5005

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
