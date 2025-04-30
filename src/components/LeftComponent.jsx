import React, { useState } from "react";
import styles from "../css/CentralComponent.module.scss"
import classNames from "classnames";

export const LeftComponent = ({ title }) => {

    return (
        <React.Fragment>
            <div className={styles.description_title}>{title === 'Harvest' ? 'Proiezione Mensile della Resa di Pistacchio' : title === 'Resources' ? "Analisi dell'Uso delle Risorse nella Coltivazione del Pistacchio" : 'Proiezioni di Guadagno nella Coltivazione del Pistacchio'}</div>
            <div className={classNames(styles.description_container)}>
                <div className={classNames(styles.description)}>
                    {title === 'Harvest' ? <React.Fragment>
                        Pistacia vera, ossia il Pistacchio, è un arbusto, un piccolo albero a foglia caduca, della famiglia delle Anacardiaceae. Un albero adulto raggiunge fino a 6 metri di altezza con un diametro complessivo della chioma della pianta di 5 metri.<br />
                        Si coltivano varietà di pistacchio raggruppate in bianche, rosse e gialle, in relazione al colore del pericarpo (mallo). La varietà più diffusa in Italia è la  Bianca, comunemente chiamata "Napoletana" o "Nostrale", di cui il seme di colore verde ne rappresenta il fattore commerciale di pregio.<br />
                        La pianta di pistacchio si adatta ai viti tipi di suolo e di clima, infatti anche se è una specie adattata ai climi temperati e secchi è in grado di resistere anche a temperature come 40-45° fino i -30° in inverno. In oltre si difende bene dalla siccità e gelate tardive primaverili ricacciando nuove gemme.<br />
                        Il pistacchio fruttifica in un ciclo biennale che assieme alle variazioni climatiche causa grandi variazioni nelle rese e nei prezzi. Producendo frutti tutti gli anni, la produzione è soggetta ad anni di carica e di scarica. Tipicamente si cerca di far riposare la pianta durante gli anni di scarica in modo da avere un raccolto più abbondante negli anni di carica.<br />
                        <br />
                        Per motivi di comodità prendiamo in esame un ipotetico anno di "carica" dove impostando i vari fattori argonomici che influenzano la produzione ne analizziamo la resa per ogni mese dell'anno.<br />
                        Ogni mese dell'anno è stato associato a un "valore" di produzione, mentre ogni fattore agronomico contribuisce con un peso diverso alla resa del pistacchio.<br />
                        I valori di questi fattori sono stati applicati a un modello di previsione dell'"efficienza" di produzione per ciascun mese. Combinando i fattori secondo pesi specifici, si ottiene una proiezione realistica della produzione mensile di pistacchi.<br />

                    </React.Fragment>
                        :
                        (title === 'Resources' ?
                            <React.Fragment>
                                La resa e l'efficienza nella coltivazione del pistacchio sono strettamente legate all'uso delle risorse impiegate nella sua produzione. Questo aspetto che potrebbe sembrare essere più pertinente in un ottica economica, è legato a stretto giro con la corretta crescita e manutenzione della pianta poichè il loro ponderato e corretto impiego, basato sulle necessità che la pianta affronta durante l'anno, permetterà una resa ottimale del raccolto.<br />
                                L'irrigazione e la fertilizzazione sono le fondamentali risorse impiegate nella coltivazione del pistacchio e monitorandone l'uso, è possibile ottimizzarne la produzione e favorire la crescita delle piante e garantendo una resa elevata ed al contempo uno sviluppo costante.<br />
                                <br />
                                Nel grafico 'Produzione Annua' viene confrontata la resa ideale in condizioni ottimali di coltivazione, calcolata come 3000 kg/ha (colore Rosso Mattone), e la produzione annua stimata, ottenuta tenendo conto dei vari fattori agronomici selezionati (colore Verde).<br />
                                Il grafico evidenzia come la produzione annua vari in base ai fattori agronomici, come la densità di impianto, l'irrigazione, la fertilizzazione e altre variabili che influenzano direttamente la resa del pistacchio.<br />
                                I grafici a ciambella, invece, mostrano un confronto visivo tra la produzione massima ottimale e i valori stimati, normalizzati come percentuali. Questo approccio permette di visualizzare in modo intuitivo e immediato come l'uso delle risorse influisca sulla resa complessiva della coltivazione del pistacchio.<br />
                            </React.Fragment>
                            :
                            <React.Fragment>
                                Per effettuare la stima dei costi e dei guadagni derivati dalla coltivazione del pistacchio si è deciso di omettere i costi fissi come affitto di locali, utenze, spese per il personale, assicurazioni, licenze e di semplificare eventuali tipi di vendita con i diversi prezzi derivati, utilizzando un unico prezzo per chilogrammo.<br />
                                Il prezzo del pistacchio è determinato dalla domanda di mercato, la qualità del prodotto e dalle fattori che ne condizionano la produzione. Anche i costi affrontati durante la coltivazione del pistacchio partecipano alla definizione del suo prezzo, i costi d'irrigazione e di fertilizzazione incidono in modo diretto sul prezzo di vendita.<br />
                                <br />
                                I grafici forniscono una panoramica sull'efficienza produttiva mettendo in evidenza variabili come il costo dell'acqua, della fertilizzazione e del prezzo di vendita di queste, influenzino i risultati economici.<br />
                                Cambiando i valori come il costo delle risorse o il prezzo di vendita, è possibile simulare diversi scenari economici ottenendo una visione dell'impatto che questi hanno sulla performance finanziaria complessiva della coltivazione del pistacchio.<br />
                                Il grafico "Efficienza Calcolata" sottolinea il rapporto tra la produzione ottimale di pistacchi (3000 kg/ha) e la produzione stimata in base ai fattori agronomici selezionati. Rappresentando come una percentuale questo rapporto, offre una visione immediata sull'efficienza della coltivazione stimata rispetto al massimo potenziale teorico.<br />
                                Il grafico "Margini di Miglioramento" mette in evidenza il confronto tra il guadagno teorico ottenuto dalla produzione ottimale e quella stimata, affiancandoli ai costi sostenuti per l'irrigazione e la fertilizzazione. Questo grafico mostra in modo diretto come al variare dei costi come il prezzo dell’acqua, il costo della fertilizzazione ed il prezzo di vendita influenzino i margini di profitto, offrendo una panoramica chiara delle opportunità di miglioramento economico.<br />
                            </React.Fragment>
                        )}
                </div>
            </div>
        </React.Fragment>

    );
};
