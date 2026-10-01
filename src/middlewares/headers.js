exports.setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Origin", " GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Origin", "Content-Type, Authorizaion")
    next()
}