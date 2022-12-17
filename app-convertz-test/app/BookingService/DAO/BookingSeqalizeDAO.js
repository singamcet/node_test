const BookingDAO = require("./BookingsDAO");

class BookingSeaalizeDAO extends BookingDAO {
    constructor(BookingModel, db, config) {
        super(BookingModel, db, config)
        this.BookingModel = BookingModel;
        this.db = db;
        this.config = config;
    }

    async createBooking(params) {
        let data = await this.BookingModel.create(params)
        return data
    }
    
    async getBookingById(id) {
        let operatorSchedules = await this.BookingModel.findByPk(id)
        return operatorSchedules.get({ plain: true });
    };
    
    async updateBookingById(id, body) {
        return this.BookingModel.update(body, {
            where: { id: id }
        })
    };

    async getAvialbleOperators(body) {
        let engagedOperators = await this.BookingModel.findAll({
            attributes: [[this.db.Sequelize.fn('DISTINCT', this.db.Sequelize.col('serviceOperatorId')), 'serviceOperatorId']],
            where: {
                "day": body.day,
                "startTime": body.startTime,
                "isActive": true
            },
            raw: true
        })
        if (engagedOperators.length == this.config.serviceOperators.length) {
            return null;
        } else {
            let engagedOperatorIds = engagedOperators.map(op => op.serviceOperatorId);
            let availableOperator = this.config.serviceOperators.filter(operator => !engagedOperatorIds.includes(operator.id));
            let serviceOperatorId = availableOperator[0].id;
            return serviceOperatorId;
        }
    }

    async getAppointmentsofAnOperatorOfAPeriod(body) {
        let operatorSchedules = await this.BookingModel.findAll({
            where: {
                "day": body.day,
                "startTime": body.startTime,
                "isActive": true,
                serviceOperatorId: body.serviceOperatorId
            },
            raw: true
        })
        return operatorSchedules;
    };
  
    async getAppointmentsofAnOperator(serviceOperatorId) {
        let operatorSchedules = await this.BookingModel.findAll({
            where: {
                serviceOperatorId: serviceOperatorId,
                isActive: true
            },
            order: [['day', 'ASC']],
            raw: true
        })
        return operatorSchedules;
    };
    
}

module.exports = BookingSeaalizeDAO;