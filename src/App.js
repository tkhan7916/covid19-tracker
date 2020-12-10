import React from 'react';

import {Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        code: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (cd) => {
        const fetchedData = await fetchData(cd);
        this.setState({data: fetchedData, code: cd});
    }

    render () {
        const {data, code} = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} code={code} />
            </div>

        );
    }
}

export default App;