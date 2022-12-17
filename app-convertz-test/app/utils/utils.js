

exports.groupBy = function (list, keyGetter) {
    const map = {};
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map[key];
        if (!collection) {
            map[key] = [item];
        } else {
            collection.push(item);
        }
    });
    return map;
}

exports.getVacantSchedulesPerDay = function (groupByDay, config) {
    let  days = [];
    //Looop for 30 days
    for (let dayCount = 1; dayCount <= config.maxDay; dayCount++) {
        if (groupByDay.hasOwnProperty(dayCount)) {
            let day = dayCount;
            let sortedDay = groupByDay[day].sort(function (a, b) {
                return a.startTime - b.startTime;
            });
            let availableSlots = [];
            let slotStartTime = 0;
            //Looop for 24 hours
            for (let startTime = 0; startTime < config.maxHoursInADay + 1; startTime++) {
                let slot = sortedDay.find(e => e.startTime === startTime);
                if (slot && slot.startTime == 0) {
                    slotStartTime = slot.endTime;
                } else if (slot) {
                    availableSlots.push(`${slotStartTime}-${slot.startTime}`)
                    slotStartTime = slot.endTime;
                } else if (startTime == config.maxHoursInADay) {
                    availableSlots.push(`${slotStartTime}-${config.maxHoursInADay}`)
                }
            }
            days.push({
                dayId: day,
                title: `Day ${day}`,
                bookingSchedules: availableSlots
            })
        } else {
            days.push(
                {
                    dayId: dayCount,
                    title: `Day ${dayCount}`,
                    bookingSchedules: [`0-${config.maxHoursInADay}`]
                }
            )
        }
    }
    return days;
}