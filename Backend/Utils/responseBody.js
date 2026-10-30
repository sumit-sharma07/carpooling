const successResponseBody = {
    success: true,
    data: {},
    err: {},
    message: "The request processed successfully."
};

const errorResponseBody = {
    success: false,
    data: {},
    err: {},
    message: "The request failed to process."
}


module.exports = {
    errorResponseBody,
    successResponseBody
}