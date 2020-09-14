const fs = require('fs')
const path = require('path')

const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a' // to accumulate logs, won't empty the file
    })
    return writeStream
}

const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}

// write access log
const accessWriteStream = createWriteStream('access.log')
const access = (log) => {
    writeLog(accessWriteStream, log)
}

// write error log
const errorWriteStream = createWriteStream('error.log')
const error = (log) => {
    writeLog(errorWriteStream, log)
}

// write event log
const eventWriteStream = createWriteStream('event.log')
const event = (log) => {
    writeLog(eventWriteStream, log)
}

module.exports = {
    access,
    error,
    event
}