
module.exports = app => {
    const bookings = require("../controllers/booking.controllers");
    const { isValidBookingData, isValidRescheduleData } = require('./../middlewares/requestValidator')
    var router = require("express").Router();

    // Routes to operate Bookings

    router.get("/listOperators", bookings.listOperators);
    router.post("/", [isValidBookingData], bookings.createBooking);
    router.put("/:bookingId", [isValidRescheduleData], bookings.rescheduleBooking);
    router.get("/:operatorId", bookings.getBookingsOfAnOperator);
    router.get("/:operatorId", bookings.getBookingsOfAnOperator);
    router.get("/listAvailableBookings/:operatorId", bookings.listAvailableBookings);

    app.use('/api/bookings', router);
};