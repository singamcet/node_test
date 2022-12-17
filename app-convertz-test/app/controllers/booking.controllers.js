const BookingsService = require("../BookingService/BookingService");
const BookingSeaalizeDAO = require("../BookingService/DAO/BookingSeqalizeDAO");
const db = require("../models");
const config = require('./../config/config')
const utils = require('./../utils/utils')
const BookingDAO = new BookingSeaalizeDAO(db.bookings, db, config);
let bookingsService = new BookingsService(BookingDAO, utils)


exports.listOperators = (req, res) => {
    res.send(200, config.serviceOperators)
};


exports.createBooking = async (req, res) => {
    // Validate request
    // if (!req.body.hasOwnProperty("startTime") || !req.body.endTime || !req.body.day) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }
    // if (req.body.endTime <= config.maxHoursInADay && !req.body.endTime > 0) {
    //     res.status(400).send({
    //         message: `Selected wrong time, Choose time between 0-${config.maxHoursInADay}`
    //     });
    //     return;
    // }

    // if (req.body.endTime - req.body.startTime != 1) {
    //     res.status(400).send({
    //         message: "Service providers are only avilable for one hour"
    //     });
    //     return;
    // }

    try {
        let bookingData = req.body
        let response = await bookingsService.createBooking(bookingData)
        res.send(response)
    } catch (error) {
        console.log("Error occure while creating booking", error);
        res.status(500).send({
            message: "Errored",
            error: error
        });
    }
};

exports.rescheduleBooking = async (req, res) => {
    // Validate request
    // if (req.body.isReschedule) {
    //     if (!req.body.hasOwnProperty("startTime") || !req.body.endTime || !req.body.day) {
    //         res.status(400).send({
    //             message: "Content can not be empty!"
    //         });
    //         return;
    //     }
    //     if (req.body.endTime <= config.maxHoursInADay && !req.body.endTime > 0) {
    //         res.status(400).send({
    //             message: `Selected wrong time, Choose time between 0-${config.maxHoursInADay}`
    //         });
    //         return;
    //     }
    //     if (req.body.endTime - req.body.startTime != 1) {
    //         res.status(400).send({
    //             message: "Service providers are only avilable for one hour"
    //         });
    //         return;
    //     }
    // }

    try {
        let bookingData = req.body
        let response = await bookingsService.updateBooking(req.params.bookingId, bookingData)
        res.send(response)
    } catch (error) {
        console.log("Error occure while creating booking", error);
        res.status(500).send({
            message: "Errored",
            error: error
        });
    }
};

exports.getBookingsOfAnOperator = async (req, res) => {
    try {
        let response = await bookingsService.getBookingByOperatorId(req.params.operatorId)
        res.send(response)
    } catch (error) {
        console.log("Error occure while creating booking", error);
        res.status(500).send({
            message: "Errored",
            error: error
        });
    }
};

exports.listAvailableBookings = async (req, res) => {
    try {
        let response = await bookingsService.listAvailableBookings(req.params.operatorId)
        res.send(response)
    } catch (error) {
        console.log("Error occure while creating booking", error);
        res.status(500).send({
            message: "Errored",
            error: error
        });
    }
};