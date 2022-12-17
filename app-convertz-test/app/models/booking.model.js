module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
      day: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      },
      serviceOperatorId: {
        type: Sequelize.INTEGER
      },
      isActive : {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Booking;
  };
  