import React, { useState } from "react";
import styles from "../css/CentralComponent.module.scss"
import classNames from "classnames";
import { HarvestComponent } from "./HarvestComponent";
import { ResourcesComponent } from "./ResourcesComponent";
import { FinancialComponent } from "./FinancialComponent";
import { LeftComponent } from "./LeftComponent";

import { produzioneMensileTop, produzioneMensileMiddle, produzioneMensileBottom } from "../utils/formuleHelper";

export const CentralComponent = ({ selectedComponent, setSelectedComponent, monthlyProduction, obj, produzioneAnnua }) => {

    const roundedValues = (values) => {
        let ret = Object.keys(values)
            .sort((a, b) => {
                const monthsOrder = {
                    'Gennaio': 1,
                    'Febbraio': 2,
                    'Marzo': 3,
                    'Aprile': 4,
                    'Maggio': 5,
                    'Giugno': 6,
                    'Luglio': 7,
                    'Agosto': 8,
                    'Settembre': 9,
                    'Ottobre': 10,
                    'Novembre': 11,
                    'Dicembre': 12
                };

                return monthsOrder[a] - monthsOrder[b];
            })
            .map(key => {
                // Verifica se il valore è un numero valido
                const value = values[key];
                return (typeof value === 'number' && !isNaN(value)) ? value.toFixed(2) : '0.00'; // Fallback se non è un numero valido
            });
        return ret
    }

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <div className={classNames('flex', styles.menu_container)}>
                        <div onClick={() => setSelectedComponent('Harvest')} className={selectedComponent === 'Harvest' ? classNames('bold', styles.menu_label, styles.menu_selected) : classNames('semiBold  pointer', styles.menu_label)}>Andamento produttivo</div>
                        <div onClick={() => setSelectedComponent('Resources')} className={selectedComponent === 'Resources' ? classNames('bold', styles.menu_label, styles.menu_selected) : classNames('semiBold pointer', styles.menu_label)}>Uso delle risorse</div>
                        <div onClick={() => setSelectedComponent('Financial')} className={selectedComponent === 'Financial' ? classNames('bold', styles.menu_label, styles.menu_selected) : classNames('semiBold pointer', styles.menu_label)}>Performance finanziaria</div>
                    </div>
                </div>

                <div className="flex wrap vertical-center p-10">
                    <div Style="width: 30%;">
                        <LeftComponent title={selectedComponent} />
                    </div>
                    <div Style="width: 70%;">
                        {selectedComponent === 'Harvest' ?
                            <HarvestComponent
                                roundedValues={roundedValues(monthlyProduction)}
                                produzioneMensileTop={roundedValues(produzioneMensileTop)}
                                produzioneMensileMiddle={roundedValues(produzioneMensileMiddle)}
                                produzioneMensileBottom={roundedValues(produzioneMensileBottom)}
                            />
                            :
                            (selectedComponent === 'Resources' ?
                                <ResourcesComponent valoriIniziali={obj} produzioneAnnua={produzioneAnnua} />
                                :
                                <FinancialComponent valoriIniziali={obj} produzioneAnnua={produzioneAnnua} />
                            )}
                    </div>

                </div>

            </div>
        </div>

    );
};
