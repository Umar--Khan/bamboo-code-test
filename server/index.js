const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

const PORT = 5000

//middleware
app.use(cors())
app.use(express.json())

// User routes
app.post('/users', async (req, res) => {
    try {
        const { name, password } = req.body
        const newUser = await pool.query("INSERT INTO user_info (name, password, balance) VALUES($1, $2, $3) RETURNING *", [name, password, 100])

        res.json(newUser.rows[0])
    } catch (e) {
        console.log(e.message)
    }
})

app.get('/users', async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM user_info")

        res.json(allUsers.rows)
    } catch (e) {
        console.log(e.message)
    }
})

app.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params
        const user = await pool.query("SELECT * FROM user_info WHERE user_info_id = $1", [id])

        res.json(user.rows[0])
    } catch (e) {
        console.log(e.message)
    }
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})
