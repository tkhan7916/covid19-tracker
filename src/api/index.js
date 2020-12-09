import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get('https://covid19-api.org/api/timeline');

        return data.map(({ total_cases, total_recovered, total_deaths, last_update: date }) => ({ confirmed: total_cases, recovered: total_recovered, deaths: total_deaths, date }));
    } catch (error) {
        return error;      
    }
};

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        

        return countries.map((country) => country.name);
    
    } catch (error) {
        console.log(error);
    }
}