module.exports = (schema) => (req, res, next) => {
    let validationData;

    if (req.method === 'POST' && req.body && Object.keys(req.body).length !== 0) {
        validationData = req.body;
    } else if (req.method === 'GET' && req.query) {
        validationData = req.query;
    }

    if (!validationData) {
        return res.status(400).json({ success: false, message: 'Request body or query data is missing.' });
    }

    const ragVal = schema.validate(validationData);
    console.log(ragVal, "Validation Result");

    if (ragVal.error) {
        const message = ragVal.error.message;
        return res.status(400).json({ success: false, message });
    } else {
        next();
    }
};