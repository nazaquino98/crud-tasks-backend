import { newConnection } from "../db.js"
import { validationResult } from "express-validator"

const getTasks = async (req, res) => {
    const connection = await newConnection()
    const results = await connection.query("SELECT * FROM tasks")
    res.json(results[0])
    connection.end()
}

const getTaskById = async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id
    const results = await connection.query("SELECT * FROM tasks WHERE id = ?", id)
    res.json(results[0])
    connection.end()
}

const postTask = async (req, res) => {
    const connection = await newConnection()
    const { title, description, isComplete } = req.body
    connection.query("INSERT INTO tasks (title, description, isComplete) values (?, ?, ?)", [title, description, isComplete])
    res.send("tarea creada correctamente")
    connection.end()
}

const putTaskById = async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id
    const { title, description, isComplete } = req.body
    await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", [title, description, isComplete, id])
    res.send("tarea actualizada correctamente")
    connection.end()
}

const deleteTaskById = async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id
    const results = await connection.query("DELETE FROM tasks WHERE id = ?", id)
    res.send("tarea eliminada correctamente")
    connection.end()
}

export { getTasks, getTaskById, postTask, putTaskById, deleteTaskById }