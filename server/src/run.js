require('dotenv').config()
const app = require('./app')
const PORT = 5001

async function init () {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}

init()
