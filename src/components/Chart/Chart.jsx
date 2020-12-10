import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, code}) => {
    const [dailyData_o, setDailyData] = useState([]);
    const dailyData = dailyData_o.slice(0).reverse();

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData(code));
        }

        fetchAPI();
    }, [code]);

    const lineChart = (
        dailyData.length
        ? (
        <Line className={styles.line}
          data={{
              labels: dailyData.map(({date}) => new Date(date).toLocaleDateString()),
              datasets: [{
                  data: dailyData.map((data) => data.confirmed),
                  label: 'Infected',
                  borderColor: '#3333ff',
                  fill: true,
              }, {
                  data: dailyData.map((data) => data.recovered),
                  label: 'Recovered',
                  borderColor: 'green',
                  backgroundColor: 'rgba(0, 255, 0, 0.5)',
                  fill: true,
              }, {
                  data: dailyData.map((data) => data.deaths),
                  label: 'Deaths',
                  borderColor: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  fill: true,
              }],
          }}
          options={{
            title: {display: true, text: `Timeline`},
          }}
        />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar className={styles.bar}
              data={{
                  labels: ['Infected', 'Recovered', 'Deaths'],
                  datasets: [{
                      label: 'People',
                      backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                      data: [confirmed, recovered, deaths]
                  }]
              }}
              options={{
                  legend: {display: false},
                  title: {display: true, text: `Current totals`},
              }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {lineChart}
            {code ? barChart : null}
        </div>
    )
}

export default Chart;