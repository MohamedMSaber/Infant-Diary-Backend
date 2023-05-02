module.exports = (err, req, res, next) => {
    if (err) {
        if (process.env.MODE_ENV === "DEV") {
            return res.status(err['cause'] || 500).json({ message: err.message, stack: err.stack })

        } else {
            return res.status(err['cause'] || 500).json({ message: err.message })
        }
    }
}