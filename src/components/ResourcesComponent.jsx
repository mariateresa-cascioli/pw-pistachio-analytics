import React, { useState, useEffect } from "react";
import styles from "../css/AnalyticsComponents.module.scss"
import classNames from "classnames";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, Title } from 'chart.js';
import ReactSlider from "react-slider";
import {
    calcoloQuantitaPianteAH,
    calcoloUtilizzoIrrigazione,
    utilizzoIrrigazioneNormalizzato,
    usoDelleRisorse,
    calcoloUtilizzoFertilizzazione,
    utilizzoFertilizzazioneNormalizzato
} from "../utils/formuleHelper";

export const ResourcesComponent = ({ valoriIniziali, produzioneAnnua }) => {

    const [efficienzaCalcolata, setEfficienzaCalcolata] = useState('')
    const [efficienzaStimataMassima, setEfficienzaStimataMassima] = useState('')
    const [utilizzoIrrigazioneN, setutilizzoIrrigazioneN] = useState('')
    const [utilizzoFertilizzazioneN, setutilizzoFertilizzazioneN] = useState('')
    const [efficienzaAnnuaEffettiva, setEfficienzaAnnuaEffettiva] = useState('')
    const [efficienzaAnnuaTeoricaMassima, setEfficienzaAnnuaTeoricaMassima] = useState('')
    const [utilizzoIrrigazioneEffettivo, setutilizzoIrrigazioneEffettivo] = useState('')
    const [utilizzoFertilizzazioneEffettivo, setutilizzoFertilizzazioneEffettivo] = useState('')
    const [usoRisorse, setUsoRisorse] = useState('')


    useEffect(() => {
        let quantitaPianteAH = calcoloQuantitaPianteAH(valoriIniziali['densita'].value)
        let utilizzoIrrigazioneEffettivo = calcoloUtilizzoIrrigazione(valoriIniziali['irrigazione'].value, quantitaPianteAH)
        let utilizzoFertilizzazioneEffettivo = calcoloUtilizzoFertilizzazione(valoriIniziali['fertilizzazione'].value)
        let utilizzoIrrigazioneN = utilizzoIrrigazioneNormalizzato(utilizzoIrrigazioneEffettivo, quantitaPianteAH)
        let utilizzoFertilizzazioneN = utilizzoFertilizzazioneNormalizzato(utilizzoFertilizzazioneEffettivo)
        let usoRisorse = usoDelleRisorse(produzioneAnnua, utilizzoIrrigazioneN, utilizzoFertilizzazioneN)
        setUsoRisorse(usoRisorse)
        setutilizzoIrrigazioneEffettivo(utilizzoIrrigazioneEffettivo)
        setutilizzoFertilizzazioneEffettivo(utilizzoFertilizzazioneEffettivo)
        setEfficienzaAnnuaEffettiva(produzioneAnnua)
        setEfficienzaAnnuaTeoricaMassima(3000)
        setutilizzoIrrigazioneN(utilizzoIrrigazioneN)
        setutilizzoFertilizzazioneN(utilizzoFertilizzazioneN)
    }, [produzioneAnnua]);

    ChartJS.register(ArcElement, Tooltip, Legend, Title);
    const doughnutDataEfficienza = {
        labels: ['Efficienza calcolata', 'Margine di miglioramento'],
        datasets: [
            {
                label: '',
                data: [parseInt(usoRisorse), parseInt(100 - usoRisorse)],
                backgroundColor: [
                    '#90981b',
                    '#90981b70',
                ],
                borderWidth: 0,
            },
        ],
    };

    const doughnutDataIrrigazione = {
        labels: ['Efficienza Irrigazione'],
        datasets: [
            {
                label: '',
                data: [parseInt(utilizzoIrrigazioneN * 100), parseInt(100 - (utilizzoIrrigazioneN * 100))],
                backgroundColor: [
                    '#3BAFDA',
                    '#3bafda7a',
                ],
                borderWidth: 0,
            },
        ],
    };
    const doughnutDataFertilizzazione = {
        labels: ['Efficienza fertilizzazione'],
        datasets: [
            {
                label: '',
                data: [parseInt(utilizzoFertilizzazioneN * 100), parseInt(100 - (utilizzoFertilizzazioneN * 100))],
                backgroundColor: [
                    '#f6bb42',
                    '#f6bb427d',
                ],
                borderWidth: 0,
            },
        ],
    };

    const barData = {
        labels: ['Efficienza teorica massima', 'Efficienza effettiva'],
        // 'utilizzo irrigazione', 'utilizzo fertilizzazione'],
        datasets: [
            {
                label: 'Sales',
                data: [parseInt(efficienzaAnnuaTeoricaMassima), parseInt(produzioneAnnua)],
                //, parseInt(utilizzoIrrigazioneEffettivo), parseInt(utilizzoFertilizzazioneEffettivo)],
                backgroundColor: ['#7a302b', '#90981b'],
                borderColor: ['#7a302b', '#90981b'],

                borderWidth: 1,
            },

        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    // Funzione che modifica la visibilità della tooltip
                    label: function (tooltipItem) {
                        // Nascondi la tooltip per il secondo elemento (indice 1)
                        if (tooltipItem.dataIndex === 1) {
                            return 'Margine di miglioramento: ' + tooltipItem.raw + '%';  // Rimuovi la label (tooltip) per l'indice 1
                        }
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';  // Altrimenti, mostra la label normale
                    }
                }
            },
            title: {
                display: true,
                text: '',
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'Poppins-SemiBold',
                        size: 12,
                        weight: 'normal',
                        style: 'normal',
                    },
                    color: '#341F14ff'
                }
            }
        },
    }
    const barOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + 'kg/ha';
                    },
                },
            },
            title: {
                display: true,
                text: '',
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    font: {
                        family: 'Poppins-SemiBold',
                        size: 12,
                        weight: 'normal',
                        style: 'normal',
                    },
                    color: '#341F14ff'
                }
            }
        }, scales: {
            y: {
                title: {
                    display: true,
                    text: 'Produzione Annua (kg/ha)',  // Etichetta asse Y
                    font: {
                        family: 'Poppins-SemiBold',
                        size: 12,
                        weight: 'normal',
                        style: 'normal',
                    },
                    color: '#341F14ff'
                },
                beginAtZero: true,  // Imposta l'inizio dell'asse Y a zero
                //max: 1, 
            },
            x: {
                title: {
                    display: true,
                    text: 'Produzione annua',  // Etichetta asse Y
                    font: {
                        family: 'Poppins-SemiBold',
                        size: 12,
                        weight: 'normal',
                        style: 'normal',
                    },
                    color: '#341F14ff'
                },
                beginAtZero: true,  // Imposta l'inizio dell'asse Y a zero
                //max: 1, 
            }
        },
    }


    const handleField = (input, field) => {
        let tmp = obj
        tmp[field] = input
        setObj({ ...tmp })
    }

    return (
        <div>
            <div className="flex wrap w-100" Style="margin-left: 40px; place-self: center; place-content: center;">
                <div className={classNames("w-50 ", styles.resources_chart_container)}>
                    <div className={styles.resources_chart_wrapper_bar}>
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
                <div className={classNames("w-50 ", styles.resources_chart_container)} Style="place-items: center;">
                    <div Style="margin-top: -90px;">
                        <div className={classNames("w-100 ")}>
                            <div className={styles.resources_chart_wrapper}>
                                <Doughnut data={doughnutDataEfficienza} options={options} />
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className={styles.resources_chart_wrapper_small}>
                            <Doughnut data={doughnutDataIrrigazione} options={options} />
                        </div>
                        <div className={styles.resources_chart_wrapper_small}>

                            <Doughnut data={doughnutDataFertilizzazione} options={options} />

                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};