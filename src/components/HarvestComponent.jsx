import React, { useState, useEffect, useRef } from "react";
import styles from "../css/AnalyticsComponents.module.scss"
import classNames from "classnames";
import { Doughnut, Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { } from "../utils/formuleHelper";

export const HarvestComponent = ({ roundedValues, produzioneMensileTop, produzioneMensileMiddle, produzioneMensileBottom }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const barData = {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        datasets: [
            {
                label: 'Produzione kg/ha',
                data: roundedValues,
                backgroundColor: ['#A4D07C', '#B0E57C', '#88B04B', '#D5F0C3', '#A8D08D', '#9B77B1', '#C9E6A1', '#9DC99E', '#D1E8B0', '#B8E19D', '#A3C2A8', '#8A5CB5'],
                borderColor: ['#f0f0f0'],
                borderWidth: 0,
            },
        ],
    };

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            // Distruggere il grafico esistente prima di creare un nuovo grafico
            chartRef.current.destroy();
        }
    }, [barData]);

    // Dati per il Line Chart
    const lineData = {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        datasets: [
            {
                label: 'Produzione stimata kg/ha',
                data: roundedValues,
                borderColor: '#D72638',
                backgroundColor: '#D72638',
                fill: true,
            },
            {
                label: "Produzione ottimale kg/ha",
                data: produzioneMensileTop,
                borderColor: "#341F14ff",
                backgroundColor: "#341F14ff",
                fill: true,
            },
            {
                label: "Produzione media kg/ha",
                data: produzioneMensileMiddle,
                borderColor: "#6C4A36ff",
                backgroundColor: "#6C4A36ff",
                fill: true,
            },
            {
                label: "Produzione sfavorevole kg/ha",
                data: produzioneMensileBottom,
                borderColor: "#A89B6Dff",
                backgroundColor: "#A89B6Dff",
                fill: true,
            }
        ],
    };

    // Opzioni comuni per tutti i grafici
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,

            },
            legend: {
                position: 'top',
                display: true,
                labels: {
                    font: {
                        family: 'Poppins-SemiBold',  // Usa il font dichiarato in SCSS
                        size: 12,  // Modifica la dimensione del font
                        weight: 'normal',  // Modifica il peso del font
                        style: 'normal',  // Imposta lo stile (normale)
                    },
                    color: '#341F14ff'
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Produzione Mensile (kg)',  // Etichetta asse Y
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                beginAtZero: true,  // Imposta l'inizio dell'asse Y a zero
                max: 600,  // Imposta il valore massimo dell'asse Y a 500
            },
            x: {
                title: {
                    display: true,
                    text: '',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            }
        },
    };

    return (
        <React.Fragment>
            <div className="w-100">
                <div className="flex wrap">
                    {/* 
                    <div className="w-50" Style="margin-left: auto;">
                        <div className="p-20">
                            <Bar data={barData} options={options} chartRef={chartRef} />
                        </div>
                    </div>
                        */}
                    <div className={classNames("w-100 ml-20 ", styles.harvest_chart_container)}>
                        <div className={styles.harvest_chart_wrapper}>
                            <Line data={lineData} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};