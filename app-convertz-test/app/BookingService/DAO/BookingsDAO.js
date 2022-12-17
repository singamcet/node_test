class BookingDAO {
    constructor(Model, db, config) {
        this.BookingModel = Model;
        this.db = Model;
        this.config = config;
    }
    async createBooking(params) {
    }
    async getAvialbleOperators(params) {

    }
    async getAppointmentsofAnOperatorOfAPeriod(body) { }

    async getBookingById(id) { }

    async updateBookingById(id, body) { }

    async getAppointmentsofAnOperator(serviceOperatorId) { }
}

module.exports = BookingDAO;