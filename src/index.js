//iniciar servidor
import express, { json } from "express"
//crear servidor
const app = (express())
//usar middlwares
app.use(json())

import {router} from "./router/router.js" 

app.use(router)

//correr servidor
const PORT = 4000
app.listen(PORT, () => console.log("servidor corriendo en el puerto " + PORT))