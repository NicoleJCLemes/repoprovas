export default function errorHandlerMiddleware(error, req, res, next) {
    if (error.type === "Conflict") {
        return res.status(409).send(error.message);
    }
    ;
    if (error.type === "Unprocessable Entity") {
        return res.status(422).send(error.message);
    }
    ;
    if (error.type === "Not Found") {
        return res.status(404).send(error.message);
    }
    ;
    if (error.type === "Unauthorized") {
        return res.status(401).send(error.message);
    }
    ;
    console.log(error);
    res.status(500).send("Unknown error");
}
