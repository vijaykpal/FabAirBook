const constant = {
    GET_FLIGHT_URL: 'https://api.npoint.io/4829d4ab0e96bfab50e7',
    BOOKING_SUCCESS_URL: 'https://api.npoint.io/d0fe9a5513208c354c52',
    BOOKING_FAILURE_URL: 'https://api.npoint.io/c5e485331b0467f4e0a9',
    DAYS: {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
    },
    MONTHS: {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sept',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    },
    COLOR:{
        NEW_BLUE: '#2196F3',
        LIGHT_BLUE: '#E0FFFF',
        WHITE: '#FFF',
        BLACK: '#000',
        GRAY: '#808080',
        GREEN: '#00A300',
    },
    CABIN_CLASS:{
        ECONOMY: 'Economy',
        PREMIMU_ECONOMY: 'Premium Economy',
        BUSINESS: 'Business'
    },
    FEATURE_NOT_AVAILABLE: {
        MESSAGE_1: 'Feature is under development, it will be available soon.',
        MESSAGE_2: 'Till then stay tune...!!!'
    },
    ERROR:{
        GET_FLIGHTS_API_FAILS: 'Sorry we are unable to fetch the flights for given details. Please check the details once and try again, we will try to make it work.',
        EMPTY_FLIGHT_LIST: 'Sorry there is no flight we have found for your request. Please check the details and try again.'
    },
    LOADING:{
        MESSAGE_1: 'Hold on tight',
        MESSAGE_2: 'we are fetching the best flights for you'
    },
    BOOKING_SUCCESS_MSG: 'Your flight ticket has been confirmed and the details has sent to your registered email id and mobile number. \nHappy Journey...!!!',
    BOOKING_FAILURE_MSG: 'Something went wrong at the moment. Please try again with some other flight, that may help you.'

};

export default constant;