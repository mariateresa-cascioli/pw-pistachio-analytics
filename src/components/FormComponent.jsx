import React, { useState } from "react";
import styles from "../css/FormComponent.module.scss"
import classNames from "classnames";
import Select from 'react-select';
import Modal from 'react-modal';
import { customStyles, customModalStyles } from "../utils/customStylesHelper";


export const FormComponent = ({ obj, setObj }) => {

    const [selectedOption, setSelectedOption] = useState({})
    const [openDistributionModal, setOpenDistributionModal] = useState(false)
    const [openProductionModal, setOpenProductionModal] = useState(false)

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleField = (input, field) => {
        let tmp = obj
        tmp[field] = input
        setObj({ ...tmp })
    }

    const resetFields = () => {
        let tmp = {}
        setObj({ ...tmp })
    }

    let baseValues = {
        "controllo_parassiti": { "label": "Nessun controllo", "value": 1 },
        "densita": { "label": "<150 piante/ha", "value": 1 },
        "eta": { "label": "<5 anni", "value": 1 },
        "fertilizzazione": { "label": "<50 kg/ha/anno", "value": 1 },
        "irraggiamento": { "label": "<2000 h/anno", "value": 1 },
        "irrigazione": { "label": "<500 L/pianta/anno", "value": 1 },
        "potatura": { "label": "<10% di rami potati all'anno", "value": 1 },
        "precipitazioni": { "label": "<150 mm/anno", "value": 1 },
        "suolo": { "label": "pH <6.5", "value": 1 },
        "temperatura": { "label": "<0 °C", "value": 1 },
        "umidita": { "label": "<40% (bassa)", "value": 1 },
        "vento": { "label": ">40 km/h (forte)", "value": 1 }
    }

    let mediumValues = {
        "controllo_parassiti": { "label": "Protezione moderata", "value": 2 },
        "densita": { "label": "200 - 300 piante/ha", "value": 2 },
        "eta": { "label": "5 - 10 o 50 - 70 anni", "value": 2 },
        "fertilizzazione": { "label": "50 - 100 kg/ha/anno", "value": 2 },
        "irraggiamento": { "label": "2000 - 2500 h/anno", "value": 2 },
        "irrigazione": { "label": "500 - 800 L/pianta/anno", "value": 2 },
        "potatura": { "label": "10 - 20% di rami potati all'anno", "value": 2 },
        "precipitazioni": { "label": "150 - 300 mm/anno", "value": 2 },
        "suolo": { "label": "pH 6.5 - 7.5", "value": 2 },
        "temperatura": { "label": "0 - 20°C", "value": 2 },
        "umidita": { "label": "40 - 50% (media)", "value": 2 },
        "vento": { "label": "30 - 40 km/h (moderato)", "value": 2 }
    }

    let bestValues = {
        "controllo_parassiti": { "label": "Protezione ottimale", "value": 3 },
        "densita": { "label": "150 - 200 piante/ha", "value": 3 },
        "eta": { "label": "10 - 50 anni", "value": 3 },
        "fertilizzazione": { "label": "100 - 150 kg/ha/anno", "value": 3 },
        "irraggiamento": { "label": "2500 - 3500 h/anno", "value": 3 },
        "irrigazione": { "label": "800 - 1000 L/pianta/anno", "value": 3 },
        "potatura": { "label": "20 - 30% di rami potati all'anno", "value": 3 },
        "precipitazioni": { "label": "300 - 800 mm/anno", "value": 3 },
        "suolo": { "label": "pH 6.5 - 7.5", "value": 3 },
        "temperatura": { "label": "5 - 15°C", "value": 3 },
        "umidita": { "label": "50 - 70% (alta)", "value": 3 },
        "vento": { "label": "<30 km/h (debole)", "value": 3 }
    }

    const handleFastAnalyticsButton = (range) => {
        if (range === 'low')
            setObj({ ...baseValues })
        else if (range === 'medium')
            setObj({ ...mediumValues })
        else if (range === 'high')
            setObj({ ...bestValues })
    }

    return (
        <React.Fragment>
            <div Style="justify-items: left;" >
                <div className="flex wrap" Style="padding: 10px 0; justify-self: center;">
                    <div className="mr-20 ">
                        <div id="label-temperatura" className={classNames('bold', styles.label_form)}>Temperatura invernale</div>
                        <Select
                            inputId="react-select-temperatura"
                            aria-labelledby="label-temperatura"
                            value={obj['temperatura'] ?? '' ?? ''}
                            onChange={(e) => handleField(e, 'temperatura')}
                            options={[
                                { value: 1, label: '<0°C ' },
                                { value: 2, label: '0 - 20°C ' },
                                { value: 3, label: '5 - 15°C' },
                                { value: 4, label: '>20°C ' },

                            ]}
                            styles={customStyles}
                            placeholder={"Select..."}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-precipitazioni" className={classNames('bold', styles.label_form)}>Precipitazioni e disponibilità d'acqua</div>
                        <Select
                            inputId="react-select-precipitazioni"
                            aria-labelledby="label-precipitazioni"
                            value={obj['precipitazioni'] ?? ''}
                            onChange={(e) => handleField(e, 'precipitazioni')}
                            options={[
                                { value: 1, label: '<150 mm/anno' },
                                { value: 2, label: '150 - 300 mm/anno' },
                                { value: 3, label: '300 - 800 mm/anno' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-irraggiamento" className={classNames('bold', styles.label_form)}>Irraggiamento solare</div>
                        <Select
                            inputId="react-select-irraggiamento"
                            aria-labelledby="label-irraggiamento"
                            value={obj['irraggiamento'] ?? ''}
                            onChange={(e) => handleField(e, 'irraggiamento')}
                            options={[
                                { value: 1, label: '<2000 h/anno' },
                                { value: 2, label: '2000 - 2500 h/anno' },
                                { value: 3, label: '2500 - 3500 h/anno' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-suolo" className={classNames('bold', styles.label_form)}>Suolo e salinità</div>
                        <Select
                            inputId="react-select-suolo"
                            aria-labelledby="label-suolo"
                            value={obj['suolo'] ?? ''}
                            onChange={(e) => handleField(e, 'suolo')}
                            options={[
                                { value: 1, label: 'pH <6.5' },
                                { value: 2, label: 'pH 6.5 - 7.5' },
                                { value: 3, label: 'pH 7.0 - 8.0' },
                                { value: 4, label: 'pH >8.5' },

                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-umidita" className={classNames('bold', styles.label_form)}>Umidità</div>
                        <Select
                            inputId="react-select-umidita"
                            aria-labelledby="label-umidita"
                            value={obj['umidita'] ?? ''}
                            onChange={(e) => handleField(e, 'umidita')}
                            options={[
                                { value: 1, label: '<40% (bassa)' },
                                { value: 2, label: '40 - 50% (media)' },
                                { value: 3, label: '50 - 70% (alta)' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-vento" className={classNames('bold', styles.label_form)}>Vento</div>
                        <Select
                            inputId="react-select-vento"
                            aria-labelledby="label-vento"
                            value={obj['vento'] ?? ''}
                            onChange={(e) => handleField(e, 'vento')}
                            options={[
                                { value: 3, label: '<30 km/h (debole)' },
                                { value: 2, label: '30 - 40 km/h (moderato)' },
                                { value: 1, label: '>40 km/h (forte)' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                </div>
                <div className="flex wrap " Style="padding: 10px 0; justify-self: center;">
                    <div className="mr-20 ">
                        <div id="label-densita" className={classNames('bold', styles.label_form)}>Densità impianto</div>
                        <Select
                            inputId="react-select-densita"
                            aria-labelledby="label-densita"
                            value={obj['densita'] ?? ''}
                            onChange={(e) => handleField(e, 'densita')}
                            options={[
                                { value: 1, label: '<150 piante/ha' },
                                { value: 3, label: '150 - 200 piante/ha' },
                                { value: 2, label: '200 - 300 piante/ha' },
                                { value: 4, label: '>300 piante/ha' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-eta" className={classNames('bold', styles.label_form)}>Età piantagione</div>
                        <Select
                            inputId="react-select-eta"
                            aria-labelledby="label-eta"
                            value={obj['eta'] ?? ''}
                            onChange={(e) => handleField(e, 'eta')}
                            options={[
                                { value: 1, label: '<5 anni' },
                                { value: 2, label: '5 - 10 o 50 - 70 anni' },
                                { value: 3, label: '10 - 50 anni' },
                                { value: 4, label: '>70 anni' },

                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-irrigazione" className={classNames('bold', styles.label_form)}>Irrigazione</div>
                        <Select
                            inputId="react-select-irrigazione"
                            aria-labelledby="label-irrigazione"
                            value={obj['irrigazione'] ?? ''}
                            onChange={(e) => handleField(e, 'irrigazione')}
                            options={[
                                { value: 1, label: '<500  L/pianta/anno' },
                                { value: 2, label: '500 - 800 L/pianta/anno' },
                                { value: 3, label: '800 - 1000 L/pianta/anno' },
                                { value: 4, label: '>1000 L/pianta/anno' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-fertilizzazione" className={classNames('bold', styles.label_form)}>Fertilizzazione</div>
                        <Select
                            inputId="react-select-fertilizzazione"
                            aria-labelledby="label-fertilizzazione"
                            value={obj['fertilizzazione'] ?? ''}
                            onChange={(e) => handleField(e, 'fertilizzazione')}
                            options={[
                                { value: 1, label: '<50 kg/ha/anno' },
                                { value: 2, label: '50 - 100 kg/ha/anno' },
                                { value: 3, label: '100 - 150 kg/ha/anno' },
                                { value: 4, label: '>150 kg/ha/anno' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-potatura" className={classNames('bold', styles.label_form)}>Potatura</div>
                        <Select
                            inputId="react-select-potatura"
                            aria-labelledby="label-potatura"
                            value={obj['potatura'] ?? ''}
                            onChange={(e) => handleField(e, 'potatura')}
                            options={[
                                { value: 1, label: "<10% di rami potati all'anno" },
                                { value: 2, label: "10 - 20% di rami potati all'anno" },
                                { value: 3, label: "20 - 30% di rami potati all'anno" },
                                { value: 4, label: ">40% di rami potati all'anno" }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                    <div className="mr-20 ">
                        <div id="label-controllo_parassiti" className={classNames('bold', styles.label_form)}>Controllo parassiti</div>
                        <Select
                            inputId="react-select-controllo_parassiti"
                            aria-labelledby="label-controllo_parassiti"
                            value={obj['controllo_parassiti'] ?? ''}
                            onChange={(e) => handleField(e, 'controllo_parassiti')}
                            options={[
                                { value: 1, label: 'Nessun controllo' },
                                { value: 2, label: 'Protezione moderata' },
                                { value: 3, label: 'Protezione ottimale' }
                            ]}
                            styles={customStyles}
                        />
                    </div>
                </div>
                <div Style="padding: 5px 0 20px;" className="w-100">
                    <div className={classNames('bold', styles.label_form)} Style="justify-self: left;">Costanti</div>
                    <div className="flex ">
                        <div className="flex">
                            <div className={classNames('pointer mr-10 semiBold', styles.form_button)} onClick={() => setOpenDistributionModal(true)}>Distribuzione mensile della produzione</div>
                            <div className={classNames('pointer mr-10 semiBold', styles.form_button)} onClick={() => setOpenProductionModal(true)}>Produzione annua stimata</div>
                        </div>
                        <div className="flex" Style="margin-left: auto;">
                            <div className={classNames('pointer mr-10 semiBold', styles.fast_analytics_button)} onClick={() => handleFastAnalyticsButton('low')}>Condizioni sfavorevoli</div>
                            <div className={classNames('pointer mr-10 semiBold', styles.fast_analytics_button)} onClick={() => handleFastAnalyticsButton('medium')}>Condizioni medie</div>
                            <div className={classNames('pointer mr-10 semiBold', styles.fast_analytics_button)} onClick={() => handleFastAnalyticsButton('high')}>Condizioni ottimali</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={openDistributionModal}
                onRequestClose={() => setOpenDistributionModal(false)}
                style={customModalStyles}
                contentLabel="Example Modal"
            >
                <div className="flex vertical-center">

                    <div className={classNames("bold text-dark")}>Distribuzione mensile della produzione</div>
                    <div Style="margin-left: auto;" className={classNames("pointer", styles.button_close_modal)} onClick={() => setOpenDistributionModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                </div>
                <table className={classNames("w-100 mt-10", styles.form_table)}>
                    <thead>
                        <tr Style="text-align: left;">
                            <th className="p-10 bold">Mese</th>
                            <th className="p-10 bold">Peso (%)</th>
                            <th className="p-10 bold">Descrizione</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={classNames('text-dark p-10 regular', styles.table_td)}>Gennaio</td>
                            <td className={classNames('text-dark p-10 regular', styles.table_td)}>2%</td>
                            <td className={classNames('text-dark p-10 regular', styles.table_td)}>Riposo vegetativo, attività minima</td>
                        </tr>
                        <tr>
                            <td>Febbraio</td>
                            <td>2%</td>
                            <td>Formazione iniziale delle gemme</td>
                        </tr>
                        <tr>
                            <td>Marzo</td>
                            <td>5%</td>
                            <td>Fioritura precoce</td>
                        </tr>
                        <tr>
                            <td>Aprile</td>
                            <td>10%</td>
                            <td>Impollinazione e sviluppo iniziale del frutto</td>
                        </tr>
                        <tr>
                            <td>Maggio</td>
                            <td>12%</td>
                            <td>Crescita attiva del frutto</td>
                        </tr>
                        <tr>
                            <td>Giugno</td>
                            <td>15%</td>
                            <td>Inizio maturazione, massimo fabbisogno idrico</td>
                        </tr>
                        <tr>
                            <td>Luglio</td>
                            <td>18%</td>
                            <td>Maturazione intensa, accumulo oli e zuccheri</td>
                        </tr>
                        <tr>
                            <td>Agosto</td>
                            <td>15%</td>
                            <td>Ultima fase di maturazione, preparazione alla raccolta</td>
                        </tr>
                        <tr>
                            <td>Settembre</td>
                            <td>12%</td>
                            <td>Raccolta principale</td>
                        </tr>
                        <tr>
                            <td>Ottobre</td>
                            <td>6%</td>
                            <td>Raccolta tardiva e inizio riposo</td>
                        </tr>
                        <tr>
                            <td>Novembre</td>
                            <td>2%</td>
                            <td>Defogliazione, preparazione all'inverno</td>
                        </tr>
                        <tr>
                            <td>Dicembre</td>
                            <td>1%</td>
                            <td>Riposo vegetativo completo</td>
                        </tr>
                    </tbody>
                </table>
            </Modal>

            <Modal
                isOpen={openProductionModal}
                onRequestClose={() => setOpenProductionModal(false)}
                style={customModalStyles}
                contentLabel="Example Modal"
            >
                <div className="flex vertical-center">

                    <div className={classNames("bold text-dark")}>Produzione annua stimata</div>
                    <div Style="margin-left: auto;" className={classNames("pointer", styles.button_close_modal)} onClick={() => setOpenProductionModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="text-dark">
                        La produzione media annua di pistacchio in un impianto ottimale è di circa <span className="semiBold">3000kg/ha/anno</span>.<br />
                        Questo valore è il risultato di analisi basate su dati agricoli per pistacchieti ad alta resa.
                        In condizioni normali, la produzione varia tra 1000 e 3000 chilogrammi per ettaro (kg/ha).
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}
