//iniciar servidor
const express = require("express")

//crear servidor
const app = express()

//usar middlwares
app.use(express.json())

//crear las rutas



//correr servidor
const PORT = 4000
app.listen(PORT, () => console.log("servidor corriendo en el puerto " + PORT))