import { newConnection } from "../db.js"
import { validationResult } from "express-validator"

const getTasks = async (req, res) => {
    try {
        const connection = await newConnection()
        const [results] = await connection.query("SELECT * FROM tasks")
        await connection.end() // Asegúrate de cerrar la conexión
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).send("error del servidor")
    }
}

const getTaskById = async (req, res) => {
    try {
        const connection = await newConnection()
        const id = req.params.id
        const [results] = await connection.query("SELECT * FROM tasks WHERE id = ?", [id])
        res.json(results[0])
        await connection.end() 
    } catch (error) {
        console.log(error)
        res.status(500).send("error del servidor")
    }
}

const postTask = async (req, res) => {
    try {
        const connection = await newConnection()
        const { title, description, isComplete } = req.body
        await connection.query(
            "INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)",
            [title, description, isComplete]
        )
        res.send("Tarea creada correctamente")
        await connection.end() 
    } catch (error) {
        console.log(error)
        res.status(500).send("Error del servidor")
    }
}


const putTaskById = async (req, res) => {
    try {
        const connection = await newConnection()
        const id = req.params.id
        const { title, description, isComplete } = req.body
        await connection.query(
            "UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?",
            [title, description, isComplete, id]
        )
        res.send("Tarea actualizada correctamente")
        await connection.end() // Asegúrate de cerrar la conexión correctamente
    } catch (error) {
        console.log(error)
        res.status(500).send("Error del servidor")
    }
}



const deleteTaskById = async (req, res) => {
    try {
        const connection = await newConnection()
        const id = req.params.id

        const [results] = await connection.query("DELETE FROM tasks WHERE id = ?", [id])

        if (results.affectedRows === 0) {
            res.status(404).send("Tarea no encontrada")
            await connection.end()
            return
        }

        res.send("Tarea eliminada correctamente")
        await connection.end()
    } catch (error) {
        console.log(error)
        res.status(500).send("Error del servidor")
    }
}


export { getTasks, getTaskById, postTask, putTaskById, deleteTaskById }