/* ===== REQUIRED IMPORTS ===== */

const log4js = require("log4js")

/* ========== */

/* ===== LOG4JS SETTINGS ===== */

log4js.configure({

    /* ===== TYPES OF OUTPUT ===== */
    
    appenders: {
        app: {type: "console"},
        fileWarn: {type: "file", filename: "./log/warn.log"},
        fileError: {type: "file", filename: "./log/error.log"} 
    },
    
    /* ========== */
    /* ===== OUTPUT CATEGORIES ===== */
    
    categories: {
        app: {appenders: ["app"], level: "debug"},
        Warning: {appenders: ["fileWarn"], level:"warn"},
        Error: {appenders: ["fileError"], level:"error"},
        default: {appenders: ["app"], level: "debug"},
    }

    /* ========== */
    
})

/* ===== NEEDED LOGGERS ===== */

const all = log4js.getLogger("app")
const warn = log4js.getLogger("Warning")
const error = log4js.getLogger("Error")

/* ========== */

/* ===== FINAL LOGGER EXPORT ===== */

module.exports = {
    log: (msg) => all.info(msg),

    warn: (msg) => {
        all.warn(msg)
        warn.warn(msg)
    },

    error: (msg) => {
        all.error(msg)
        error.error(msg)
    }

}

/* ========== */