import moment from "moment"
const getLast7Days = () => {


    const currentDate = moment()
    const last7Days = []
    for(let i=0;i<7;i++){
        const dayDate = currentDate.clone().subtract(i,"days").format("dddd")
        last7Days.unshift(dayDate)
    }
    return last7Days
}

export {
    getLast7Days
}