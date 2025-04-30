import React, { useEffect, useState } from "react";
import styles from "../css/Homepage.module.scss"
import classNames from "classnames";
import { CentralComponent } from "./CentralComponent";
import { FormComponent } from "./FormComponent";
import { getValues, convertFactors, sumValues, calcoloProduzioneMensile } from "../utils/formuleHelper";

export const Homepage = () => {

    const [selectedComponent, setSelectedComponent] = useState('Harvest')
    const [produzioneAnnua, setProduzioneAnnua] = useState('')
    const [obj, setObj] = useState(
        {
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
            "vento": { "label": "<30 km/h (debole)", "value": 1 }
        })
    const [monthlyProduction, setMonthlyProduction] = useState([])

    useEffect(() => {
        if (obj) {
            let values = getValues(obj)
            let fattoriConvertiti = convertFactors(values)
            let fattoriAmbientali = {
                "temperatura": fattoriConvertiti['temperatura'],
                "precipitazioni": fattoriConvertiti['precipitazioni'],
                "irraggiamento": fattoriConvertiti['irraggiamento'],
                "suolo": fattoriConvertiti['suolo'],
                "umidita": fattoriConvertiti['umidita'],
                "vento": fattoriConvertiti['vento'],
            }
            let fattoriProduttivi = {
                "densita": fattoriConvertiti['densita'],
                "eta": fattoriConvertiti['eta'],
                "irrigazione": fattoriConvertiti['irrigazione'],
                "fertilizzazione": fattoriConvertiti['fertilizzazione'],
                "potatura": fattoriConvertiti['potatura'],
                "controllo_parassiti": fattoriConvertiti['controllo_parassiti'],
            }
            let produzioneMesePerMese = calcoloProduzioneMensile(fattoriAmbientali, fattoriProduttivi)
            setMonthlyProduction(produzioneMesePerMese)
            let produzioneAnnua = sumValues(produzioneMesePerMese)
            console.log("homepage produzione annua")
            console.log(produzioneAnnua)
            setProduzioneAnnua(produzioneAnnua)
        }
    }, [obj])


    return (
        <React.Fragment>

            <div className={styles.main_container}>
                <div className="flex vertical-center" Style="justify-content: center;position: relative;z-index: 3;">
                    <div Style="position: relative; z-index: -1;">
                        <div className={styles.pistacchio_img_container}>
                            <div className={styles.pistacchio_img}></div>
                        </div>
                    </div>
                    <div className={styles.title_container}>
                        <div className={classNames(styles.main_title, 'bold')}>Pistachio Analytics</div>
                        <div className={classNames(styles.subtitle, 'italic')}>Dashboard</div>

                    </div>
                </div>
                <FormComponent obj={obj} setObj={setObj} />
                <CentralComponent selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} monthlyProduction={monthlyProduction} obj={obj} produzioneAnnua={produzioneAnnua} />
            </div>
            <div className={classNames(styles.credits, 'italic')}>Maria Teresa Cascioli (0312400319) - AA 2024/2025 - Unipegaso L-31 </div>
        </React.Fragment>
    );
};
