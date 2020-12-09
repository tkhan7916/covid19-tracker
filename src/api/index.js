import axios from 'axios';

const url = 'https://covid19-api.org/api';

export const fetchData = async (country) => {
    try {
        if(country) {
            //changeableUrl = `https://covid19-api.org/api/status/${country}`;
            const {data: {cases, recovered, deaths, last_update}} = await axios.get(`${url}/status/${country}`);
            return {confirmed: cases, recovered, deaths, lastUpdate: last_update};
        } else {
            const {data} = await axios.get(`${url}/timeline`);
            return {confirmed: data[0].total_cases, recovered: data[0].total_recovered, deaths: data[0].total_deaths, lastUpdate: data[0].last_update};
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/timeline`);
        return data.map(({ total_cases, total_recovered, total_deaths, last_update: date }) => ({ confirmed: total_cases, recovered: total_recovered, deaths: total_deaths, date }));
    } catch (error) {
        return error;
    }
};

export const fetchCountries = async () => {
    try {
        const {data} = await axios.get(`${url}/countries`);
        return data.map((country) => [country.name, country.alpha2]);
    
    } catch (error) {
        console.log(error);
    }
}