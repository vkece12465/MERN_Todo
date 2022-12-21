class customError extends error {
    constructor(message, code){
    super(message),
    this.code = code
    }
}

module.exports = customError;