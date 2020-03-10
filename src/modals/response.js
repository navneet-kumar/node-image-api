class Response {
    status(status) {
        this.status = status === true ? "success" : "failure";
    }

    successMessage(message) {
        this.message = message
    }

    errorMessage(message) {
        this.error = message
    }
}

module.exports = Response