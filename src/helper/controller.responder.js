const responder = (res, status, data) => {
    return res.status(status).send({...data})
}

module.exports = responder