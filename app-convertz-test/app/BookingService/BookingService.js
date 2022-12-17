class BookingsService {

    constructor(BookingDAO, utils) {
        this.BookingDAO = BookingDAO;
        this.utils = utils;
    }

    // @Name : createBooking
    // @Description : Funstion to create booking
    async createBooking(body) {
        try {
            if (!body.serviceOperatorId) {
                // if Service provider is not selected assign a provide which has open slot;
                let availableOeratorId = await this.BookingDAO.getAvialbleOperators(body);
                if (!availableOeratorId) {
                    return {
                        message: "No operators are available at this date/time"
                    };
                } else {
                    body.serviceOperatorId = availableOeratorId;
                }
            } else {
                // Check availability of operator;
                let operatorSchedules = await this.BookingDAO.getAppointmentsofAnOperatorOfAPeriod(body)
                if (operatorSchedules.length) {
                    let availableOeratorId = await this.BookingDAO.getAvialbleOperators(body);
                    if (availableOeratorId) {
                        return {
                            message: `Selected operator busy at this time try with *${availableOeratorId}* operator ID`
                        };
                    } else {
                        return {
                            message: `All the operators are busy at this date/time`
                        };
                    }
                }
            }
            console.log(body)
            //Create a Booking
            const booking = {
                "day": body.day,
                "startTime": body.startTime,
                "endTime": body.endTime,
                "serviceOperatorId": body.serviceOperatorId,
                "isActive": true
            }
            // Save Booking in the database
            let data = await this.BookingDAO.createBooking(booking)
            return data
        } catch (error) {
            throw error;
        }
    }


    // @Name : updateBooking
    // @Description : Funstion to update booking

    async updateBooking(id, body) {
        try {
            if (body.isReschedule) {
                // Check availability of operator;
                let booking = await this.BookingDAO.getBookingById(id);
                if (booking.startTime == body.startTime && booking.day == body.day) {
                    return {
                        message: `You are already scheduled for same time and same service operator`
                    };
                }
                body.serviceOperatorId = booking.serviceOperatorId;
                let operatorSchedules = await this.BookingDAO.getAppointmentsofAnOperatorOfAPeriod(body);
                if (operatorSchedules.length) {
                    let availableOeratorId = await this.BookingDAO.getAvialbleOperators(body);
                    if (availableOeratorId) {
                        return {
                            message: `Selected operator busy at this time try with *${availableOeratorId}* operator ID`
                        };
                    } else {
                        return {
                            message: `All the operators are busy at this date/time`
                        };
                    }
                }
            }
            let data = await this.BookingDAO.updateBookingById(id, body)
            if (body.isReschedule) {
                return {
                    message: "Booking hasbeen rescheduled"
                }
            } else {
                return {
                    message: "Booking hasbeen cancelled"
                }
            }
        } catch (error) {
            throw error;
        }
    };


    // @Name : getBookingByOperatorId
    // @Description : Funstion to list bookings of an operator

    async getBookingByOperatorId(id) {
        try {
            let data = await this.BookingDAO.getAppointmentsofAnOperator(id)
            if (data.length) {
                let groupByDay = this.utils.groupBy(data, d => d.day);
                let dayBookings = Object.keys(groupByDay).map(day => {
                    let sortedDay = groupByDay[day].sort(function (a, b) {
                        return a.startTime - b.startTime;
                    });
                    return {
                        dayId: day,
                        title: `Day ${day}`,
                        bookingSchedules: sortedDay.map(day => `${day.startTime}-${day.endTime}`)
                    }
                })
                return { operatorDetails: this.BookingDAO.config.serviceOperators.find(op => op.id == id), schedulesPerDay: dayBookings }
            }
            return data
        } catch (error) {
            throw error;
        }
    };


    // @Name : listAvailableBookings
    // @Description : Funstion to list bookings of an operator

    async listAvailableBookings(id) {
        try {
            let data = await this.BookingDAO.getAppointmentsofAnOperator(id)
            if (data.length) {
                let groupByDay = this.utils.groupBy(data, d => d.day);
                let days = this.utils.getVacantSchedulesPerDay(groupByDay, this.BookingDAO.config)
                return { operatorDetails: this.BookingDAO.config.serviceOperators.find(op => op.id == id), slotsPerDay: days }
            }
            return data
        } catch (error) {
            throw error;
        }
    };
}

module.exports = BookingsService;