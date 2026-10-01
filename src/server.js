const app = require("./app.js")
const {default:mongoose} = require("mongoose")
const dotenv = require("dotenv")

const productionMode =  process.env.NODE_ENV === "production"

if(!productionMode){
    dotenv.config()
}
async function connectToDB(){
    try{
       await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`)
    }catch(err){
        console.error(`Error in DB connection --> ${err}`)
        process.exit(1)
    }
}

function startServer() {
    const port = process.env.PORT || 4000
    app.listen(4000, () => {
        console.log(`server running on port : ${port}`)
    })
}

async function run() {
    startServer()
    await connectToDB()
}

run()