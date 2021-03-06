// Подключение всех модулей
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)

// Отслеживание порта
server.listen(3000)

// Отслеживание url адреса и отображение нужной HTML страницы
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


// Массив со всеми подключениями
users = []
connections = []

// Функция, которая сработает при подключении к странице
// Считается как новый пользователь
io.sockets.on("connection", (socket) => {
    console.log("Подключились")
    // Добавление нового соединения в массив
    connections.push(socket)

    // Функция, которая срабатывает при отключении от сервера
    socket.on("disconnect", (data) => {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1)
        console.log("Отключились")
    })

// Функция получающая сообщение от какого-либо пользователя
    socket.on("send mess", (data) => {
        // Внутри функции мы передаем событие 'add mess',
        // которое будет вызвано у всех пользователей и у них добавиться новое сообщение
        io.sockets.emit("add mess", {mess: data.mess, name: data.name})
    })
})