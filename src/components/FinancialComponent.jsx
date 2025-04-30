import React, { useState, useEffect } from "react";
import styles from "../css/AnalyticsComponents.module.scss"
import classNames from "classnames";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, Title } from 'chart.js';
import ReactSlider from "react-slider";
import {
    calcoloQuantitaPiante,
    calcoloCostoIrrigazione,
    calcoloCostoFertilizzazione,
    usoDelleRisorse,
    costoIrrigazioneNormalizzato,
    costoFertilizzazioneNormalizzato,
    calcoloCostoVenditaPistacchio,
    performanceFinanziaria
} from "../utils/formuleHelper";

export const FinancialComponent = ({ valoriIniziali, produzioneAnnua }) => {

    const [efficienzaCalcolata, setEfficienzaCalcolata] = useState('')
    const [efficienzaStimataMassima, setEfficienzaStimataMassima] = useState('')
    const [costoIrrigazioneN, setCostoIrrigazioneN] = useState('')
    const [costoFertilizzazioneN, setCostoFertilizzazioneN] = useState('')
    const [guadagnoEffettivo, setGuadagnoEffettivo] = useState('')
    const [guadagnoTeoricoMassimo, setGuadagnoTeoricoMassimo] = useState('')
    const [costoIrrigazioneEffettivo, setCostoIrrigazioneEffettivo] = useState('')
    const [costoFertilizzazioneEffettivo, setCostoFertilizzazioneEffettivo] = useState('')
    const [obj, setObj] = useState({
        ettari: 10,
        costo_acqua: 0.0005,
        costo_fertilizzazione: 10,
        costo_pistacchio: 12.5,
    })

    useEffect(() => {
        let quantitaPiante = calcoloQuantitaPiante(obj['ettari'], valoriIniziali['densita'].value)
        let costoIrrigazioneEffettivo = calcoloCostoIrrigazione(valoriIniziali['irrigazione'].value, obj['costo_acqua'], quantitaPiante)
        let costoFertilizzazioneEffettivo = calcoloCostoFertilizzazione(valoriIniziali['fertilizzazione'].value, obj['costo_fertilizzazione'], obj['ettari'])
        let costoIrrigazioneN = costoIrrigazioneNormalizzato(costoIrrigazioneEffettivo, quantitaPiante, obj['costo_acqua'])
        let costoFertilizzazioneN = costoFertilizzazioneNormalizzato(costoFertilizzazioneEffettivo, obj['ettari'], obj['costo_fertilizzazione'])
        let risultatiPerformanceFinanziaria = performanceFinanziaria(produzioneAnnua, costoIrrigazioneN, costoFertilizzazioneN)
        let guadagnoVenditaPistacchioTeorica = calcoloCostoVenditaPistacchio(3000, obj['costo_pistacchio'], obj['ettari'])
        let guadagnoVenditaPistacchioEffettiva = calcoloCostoVenditaPistacchio(produzioneAnnua, obj['costo_pistacchio'], obj['ettari'])
        let num = Math.floor(risultatiPerformanceFinanziaria)
        let num2 = 100 - parseInt(num)
        setCostoIrrigazioneEffettivo(costoIrrigazioneEffettivo)
        setCostoFertilizzazioneEffettivo(costoFertilizzazioneEffettivo)
        setEfficienzaCalcolata(num)
        setEfficienzaStimataMassima(num2)
        setGuadagnoEffettivo(guadagnoVenditaPistacchioEffettiva)
        setGuadagnoTeoricoMassimo(guadagnoVenditaPistacchioTeorica)
    }, [produzioneAnnua, obj]);

    ChartJS.register(ArcElement, Tooltip, Legend, Title);
    const doughnutData = {
        labels: ['Efficienza calcolata', 'Margine di miglioramento'],
        datasets: [
            {
                label: 'Color Distribution',
                data: [efficienzaCalcolata, efficienzaStimataMassima],
                backgroundColor: [
                    '#90981b',
                    '#7a302b',
                ],
                borderWidth: 0,
            },
        ],
    };

    const barData = {
        labels: ['Guadagno teorico massimo', 'Guadagno effettivo', 'Costo irrigazione', 'Costo fertilizzazione'],
        datasets: [
            {
                label: 'Sales',
                data: [parseInt(guadagnoTeoricoMassimo), parseInt(guadagnoEffettivo), parseInt(costoIrrigazioneEffettivo), parseInt(costoFertilizzazioneEffettivo)],
                backgroundColor: ['#90981b', '#7a302b', '#6C4A36ff', '#A89B6Dff'],
                borderColor: ['#90981b', '#7a302b', '#6C4A36ff', '#A89B6Dff'],
                borderWidth: 1,
            },

        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    },
                },
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
                        return tooltipItem.label + ': ' + tooltipItem.raw + '€';
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
                    display: false,
                    text: 'Euro €',  // Etichetta asse Y
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
                    text: 'Produzione Annua',  // Etichetta asse Y
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
            <div className="w-100">
                <div className="flex wrap">
                    <div className={classNames("justify-left", styles.slider_cointainer)}>
                        <div className="mb-10 default-font-size semiBold text-dark">
                            Numero ettari: {obj['ettari']}
                        </div>
                        <ReactSlider
                            className="custom-slider"
                            thumbClassName="custom-thumb"
                            trackClassName="custom-track"
                            min={5}
                            max={50}
                            step={1}
                            defaultValue={obj['ettari']}
                            onChange={(val) => handleField(val, 'ettari')}
                        />
                    </div>
                    <div className={classNames("justify-left", styles.slider_cointainer)}>
                        <div className="mb-10 default-font-size semiBold text-dark">
                            Costo acqua/litro: {obj['costo_acqua']}€
                        </div>
                        <ReactSlider
                            className="custom-slider"
                            thumbClassName="custom-thumb"
                            trackClassName="custom-track"
                            min={0.0001}
                            max={0.0025}
                            step={0.0001}
                            defaultValue={obj['costo_acqua']}
                            onChange={(val) => handleField(val, 'costo_acqua')}
                        />
                    </div>
                    <div className={classNames("justify-left", styles.slider_cointainer)}>
                        <div className="mb-10 default-font-size semiBold text-dark">
                            Costo fertilizzazione/kg: {obj['costo_fertilizzazione']}€
                        </div>
                        <ReactSlider
                            className="custom-slider"
                            thumbClassName="custom-thumb"
                            trackClassName="custom-track"
                            min={5}
                            max={50}
                            step={5}
                            defaultValue={obj['costo_fertilizzazione']}
                            onChange={(val) => handleField(val, 'costo_fertilizzazione')}
                        />
                    </div>
                    <div className={classNames("justify-left", styles.slider_cointainer)}>
                        <div className="mb-10 default-font-size semiBold text-dark">
                            Prezzo vendita pistacchio/kg: {obj['costo_pistacchio']}€
                        </div>
                        <ReactSlider
                            className="custom-slider"
                            thumbClassName="custom-thumb"
                            trackClassName="custom-track"
                            min={5}
                            max={100}
                            step={2.5}
                            defaultValue={obj['costo_pistacchio']}
                            onChange={(val) => handleField(val, 'costo_pistacchio')}
                        />
                    </div>
                </div>
            </div>
            <div className="flex wrap vertical-center w-100" Style="place-content: center;">
                <div className={classNames("w-50 ", styles.resources_chart_container)} Style=" max-width: 400px; !important">
                    <Doughnut data={doughnutData} options={options} />
                </div>
                <div className={classNames("w-50 ", styles.resources_chart_container)}>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    );
};