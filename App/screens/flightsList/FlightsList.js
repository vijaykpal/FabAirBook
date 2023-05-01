import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import FlightCard from '../../components/FlightCard';
import Error from '../../components/Error';
import LoadingScreen from '../../components/LoadingScreen';
import Pill from '../../components/Pill';
import FiltersModal from '../../components/FiltersModal';
import constant from '../../utils/constant'
import {getTravellersInfo, filterFlights, sortFlightsByPrice, filterFlightsByAirlines} from '../../utils/util';

const FlightsList = ({navigation, route}) => {
    const [flights, setFlights] = useState([]);
    const [apiState, setApiState] = useState('Loading');
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [sortByFareAsc, setSortByFareAsc] = useState();
    const [originalFlightArr, setOriginalFlightArr] = useState([]);
    const {params} = route;
    const {GET_FLIGHT_URL, ERROR: {GET_FLIGHTS_API_FAILS, EMPTY_FLIGHT_LIST}} = constant;

    const fetchFlights = async () => {
        try{
            const res = await fetch(GET_FLIGHT_URL);
            const {data} = await res.json();
            const filteredFlights = filterFlights(data.result, params);
            if(filteredFlights.length){
                setFlights(filteredFlights);
                setApiState('Success');
            }
            else setApiState('Failure');
        }
        catch(err){
            setApiState('Failure');
        }    
    };

    const applyFilters = (selectedAirlines) => {
        if(selectedAirlines){
            setOriginalFlightArr(flights);
            const filtredFlights = filterFlightsByAirlines(flights, selectedAirlines);
            setFlights(filtredFlights);
        }
    }

    const onSortByFare = () => {
        setSortByFareAsc(!sortByFareAsc)
        const sortedFlights = sortFlightsByPrice(flights, !sortByFareAsc);
        setFlights(sortedFlights);
    }

    const onReset = () => {
        setFlights(originalFlightArr);
    }

    useEffect(() => {
        fetchFlights();
        return(() => {
            setApiState('Loading');
        })
    }, []);

    if(apiState === 'Loading'){
        return(
            <LoadingScreen />
        );
    }
    else if(apiState === 'Success'){
        const {deptDate, from, to, travellers} = params;

        if(!flights?.length){
            return(
                <Error 
                    onButtonClick={onReset}
                    message={EMPTY_FLIGHT_LIST}
                    buttonText='Reset'
                />
            )
        }

        return(
            <View>
                <View style={styles.detailsContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.city}>{from}</Text>
                        <Text style={styles.toTxt}>To</Text>
                        <Text style={styles.city}>{to}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.travellersinfo}>{deptDate}{', '}{getTravellersInfo(travellers) + ', ' + travellers.cabinClass}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Pill 
                        containerStyle={styles.filterBtn} 
                        onPress={() => setShowFiltersModal(true)} 
                        title='Filter' 
                        iconName='filter'
                        showIcon={true} />

                    <Pill 
                        containerStyle={styles.filterBtn} 
                        onPress={onSortByFare} 
                        title='Sort by fare' 
                        iconName={sortByFareAsc ? 'arrow-down' : 'arrow-up'}
                        showIcon={sortByFareAsc == undefined ? false : true} />
                </View>
                
                <FlatList 
                    data={flights}
                    renderItem={({item}) => <FlightCard flightDetails={item} userDetails={params} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    style={{height: '82%'}}
                />
                <FiltersModal isVisible={showFiltersModal} onClose={setShowFiltersModal} onApplyFilter={applyFilters} />
            </View>
        );
    }
    else 
        return(
            <Error 
                onButtonClick={() => navigation.goBack()}
                message={GET_FLIGHTS_API_FAILS}
                buttonText='Ok' 
            />
        );
};

const styles = StyleSheet.create({
    detailsContainer:{
        marginHorizontal: 22,
        marginVertical: 8
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    city:{
        fontSize: 18,
        fontWeight: 700,
        color: '#000'
    },
    toTxt:{
        fontSize: 14,
        paddingHorizontal: 8
    },
    travellersinfo:{
        fontSize: 14,
    },
    filterBtn:{
        marginLeft: 18,
        backgroundColor: '#E0FFFF'
    }
})

export default FlightsList;