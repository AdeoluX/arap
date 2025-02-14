const serviceResponse = (success, message, data) => {
    return {
        success,
        message,
        data
    }
}

module.exports = serviceResponse