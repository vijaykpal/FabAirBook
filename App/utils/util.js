import constant from './constant';
const {DAYS, MONTHS} = constant;

export const getTodayDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const correctMonth = month.toString().length > 1 ? month : '0' + month;
    const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();

    return date.getFullYear() + '-' + correctMonth + '-' + day
}

export const dateMonthYearFormat = (wholedate, needYear=true) => {
    const dateObj = new Date(wholedate);
    const day = dateObj.getDay();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const correctMonth = month.toString().length > 1 ? month : '0' + month;
    const year = dateObj.getFullYear();

    if(needYear) return DAYS[day] + ', ' + date + ' ' + MONTHS[correctMonth] + ' ' + year;
    return DAYS[day] + ', ' + date + ' ' + MONTHS[correctMonth] + ' ';
}

export const getDateAfter6Months = () => {
    const date = new Date();
    const month = date.getMonth() + 7;
    const correctMonth = month.toString().length > 1 ? month : '0' + month;
    const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();

    return date.getFullYear() + '-' + correctMonth + '-' + day
}

export const getTimeFromDateTime = (dateTime) => {
    const splitDt = dateTime.split("T");
    return splitDt[1];
}

export const getTravellersInfo = (travellersDetails) => {
    let res = ''
    if(travellersDetails.adults === 1){
        res = travellersDetails.adults + ' Adult'
    }
    else res = travellersDetails.adults + ' Adults'

    if(travellersDetails.children > 0){
        if(travellersDetails.children === 1){
            res = res + ', ' + travellersDetails.children + ' Child'
        }
        else res = res + ', ' + travellersDetails.children + ' Children'
    }
    return res;
}

export const filterFlights = (flights, userInfo) => {
    const {from, to} = userInfo;
    const newFlights = flights.filter(item => {
        const {displayData: {source, destination}} = item;
        if((from.toLowerCase() === source.airport.cityName.toLowerCase() || from.toLowerCase() === source.airport.cityCode.toLowerCase()) 
        && (to.toLowerCase() === destination.airport.cityName.toLowerCase() || to.toLowerCase() === destination.airport.cityCode.toLowerCase()))
        return item;
    })
    return newFlights;
}

export const sortFlightsByPrice = (flights, isAscending) => {
    if(flights?.length){
        if(isAscending){
            return flights.sort((a, b) => {
                return a.fare - b.fare;
            });
        }
        else {
            return flights.sort((a, b) => {
                return b.fare - a.fare;
            });
        }
    }
    else return []
}

export const filterFlightsByAirlines = (flights, selectedAirlines) => {
    const filteredFlights = flights.filter(item => {
        const {displayData: {airlines}} = item;
        const {airlineName} = airlines[0];
        return selectedAirlines[airlineName]
    });
    return filteredFlights;
}