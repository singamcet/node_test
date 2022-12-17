const config = require('./../config/config')

exports.isValidBookingData = async (req, res, next) => {
    if (!req.body.hasOwnProperty("startTime") || !req.body.hasOwnProperty("endTime") || !req.body.hasOwnProperty("day")) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (req.body.endTime > config.maxHoursInADay || !req.body.endTime > 0 || req.body.startTime < 0) {
        res.status(400).send({
            message: `Selected wrong time, Choose time between 0-${config.maxHoursInADay}`
        });
        return;
    }

    if (req.body.endTime - req.body.startTime != 1) {
        res.status(400).send({
            message: "Service providers are only avilable for one hour"
        });
        return;
    }

    next();
}

exports.isValidRescheduleData = async (req, res, next) => {
    if (req.body.isReschedule) {
        if (!req.body.hasOwnProperty("startTime") || !req.body.hasOwnProperty("endTime") || !req.body.hasOwnProperty("day")) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        if (req.body.endTime > config.maxHoursInADay || !req.body.endTime > 0 || req.body.startTime < 0) {
            res.status(400).send({
                message: `Selected wrong time, Choose time between 0-${config.maxHoursInADay}`
            });
            return;
        }
        if (req.body.endTime - req.body.startTime != 1) {
            res.status(400).send({
                message: "Service providers are only avilable for one hour"
            });
            return;
        }
    }

    next();
}