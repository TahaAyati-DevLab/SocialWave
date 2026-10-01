const app = require("./app.js")


function startServer() {
    app.listen(4000, () => {
        console.log("server running on port : 4000")
    })
}

function run() {
    startServer()
}

run()