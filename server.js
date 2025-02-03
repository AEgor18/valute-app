const express = require('express')
const app = express()
const port = 80

app.use(express.static('valute-app/dist'))

app.listen(port, () => console.log('Server is working'))