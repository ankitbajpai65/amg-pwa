import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl text-center font-bold mb-6">
        PRIVACY POLICY SITO INTERNET
      </h1>

      <p className="mb-4">
        Informativa per trattamento di dati personali – Documento informativo ai
        sensi e per gli effetti di cui all’art. 13 del Nuovo regolamento Europeo
        2016/679 di seguito semplificato in “G.D.P.R.”.
      </p>

      <p className="mb-4">
        In osservanza al Nuovo Regolamento Europeo 2016/679, di seguito
        G.D.P.R., siamo a fornirLe le dovute informazioni in ordine al
        trattamento dei dati personali da lei forniti. L’informativa non è da
        considerarsi valida per altri siti web eventualmente consultabili
        tramite links presenti sui siti internet a dominio del titolare, che non
        è da considerarsi in alcun modo responsabile dei siti internet dei
        terzi. Si tratta di un’informativa che è resa anche ai sensi dell’art.
        13 del G.D.P.R. L’informativa si ispira anche alla Raccomandazione n.
        2/2001 che le autorità europee per la protezione dei dati personali,
        riunite nel Gruppo istituito dall’art. 29 della direttiva n. 95/46/CE,
        hanno adottato il 17 maggio 2001 per individuare alcuni requisiti minimi
        per la raccolta di dati personali on-line, e, in particolare, le
        modalità, i tempi e la natura delle informazioni che i titolari del
        trattamento devono fornire agli utenti quando questi si collegano a
        pagine web, indipendentemente dagli scopi del collegamento, nonché a
        quanto previsto dalla Direttiva 2002/58/CE, come aggiornata dalla
        Direttiva 2009/136/CE, in materia di Cookie.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        TITOLARE DEL TRATTAMENTO
      </h2>
      <p className="mb-4">
        Ai sensi dell’art. 4 punto 7) del G.D.P.R è DATAPARTERS SA, nella
        persona del legale rappresentante pro-tempore Dott. Michele Pastrello.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        RESPONSABILE DELLA PROTEZIONE DEI DATI PERSONALI (DPO)
      </h2>
      <p className="mb-4">
        Il Titolare si avvale della società Itconsbs s.r.l. nella persona di
        Giulio Angelo Fontana reperibile ai seguenti contatti: Cell.
        +393408184807 e-mail:
        <a
          href="mailto:amministrazione@datapartners.ch"
          className="text-blue-500 underline"
        >
          amministrazione@datapartners.ch
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        LUOGO DI TRATTAMENTO DEI DATI
      </h2>
      <p className="mb-4">
        I trattamenti connessi ai servizi web di questo sito sono effettuati
        presso la sede dell’azienda, Titolare del trattamento e sono curati solo
        da propri collaboratori, incaricati del trattamento, o da eventuali
        soggetti esterni per operazioni di manutenzione od aggiornamento delle
        pagine del sito.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">TIPI DI DATI TRATTATI</h2>
      <p className="mb-4">
        Dato personale e identificativo quali nome e cognome, e-mail, numero di
        telefono e intestazione società.
      </p>
      <p className="mb-4">
        Dato personale, qualunque informazione relativa a persona fisica,
        identificata o identificabile, anche indirettamente, mediante
        riferimento a qualsiasi altra informazione, ivi compreso un numero di
        identificazione personale; Dati identificativi, i dati personali che
        permettono l’identificazione diretta dell’interessato (quali a titolo
        esemplificativo nome, cognome, data di nascita, indirizzo, indirizzo
        e-mail, numero di telefono, ecc…).
      </p>

      <p className="mb-4">Dati di navigazione</p>
      <p className="mb-4">
        In caso di utilizzo di cookie i sistemi informatici e le procedure
        software preposte al funzionamento di questo sito web acquisiscono, nel
        corso del loro normale esercizio, alcuni dati personali la cui
        trasmissione è implicita nell’uso dei protocolli di comunicazione di
        Internet.
      </p>
      <p className="mb-4">
        Si tratta di informazioni che non sono raccolte per essere associate a
        interessati identificati, ma che per loro stessa natura potrebbero,
        attraverso elaborazioni ed associazioni con dati detenuti da terzi,
        permettere di identificare gli utenti.
      </p>
      <p className="mb-4">
        In questa categoria di dati rientrano gli indirizzi IP o i nomi a
        dominio dei computer utilizzati dagli utenti che si connettono al sito,
        gli indirizzi in notazione URI (Uniform Resource Identifier) delle
        risorse richieste, l’orario della richiesta, il metodo utilizzato nel
        sottoporre la richiesta al server, la dimensione del file ottenuto in
        risposta, il codice numerico indicante lo stato della risposta data dal
        server (buon fine, errore, ecc.) ed altri parametri relativi al sistema
        operativo e all’ambiente informatico dell’utente.
      </p>

      <p className="mb-4">Dati forniti volontariamente dall’utente</p>
      <p className="mb-4">
        L’invio facoltativo, esplicito e volontario di posta elettronica agli
        indirizzi indicati su questo sito e/o la compilazione di form di
        raccolta dati, comporta la successiva acquisizione dell’indirizzo del
        mittente, necessario per rispondere alle richieste, nonché degli
        eventuali altri dati personali inseriti.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-4">COOKIES</h3>
      <p className="mb-4">
        Si veda la
        <a
          href="https://www.iubenda.com/privacy-policy/58785257/cookie-policy"
          // className="underline"
          className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
          title="Cookie Policy"
        >
          Cookie Policy
        </a>
        . Il Titolare non risponde per le attività di raccolta dati da parte dei
        collegamenti social presenti sulle pagine web del sito aziendale. Per le
        specifiche consultare la cookie policy degli stessi social networks,
        sulle loro pagine ufficiali.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        FINALITÀ DEL TRATTAMENTO
      </h2>
      <p className="mb-4">
        I dati di natura personale raccolti tramite il form di contatto servono
        per gestire la richiesta di contatto, con invio di informazioni da Lei
        richieste; Il portale consente l’accesso ai servizi offerti dal Titolare
        con accessi tramite credenziali dedicate.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        MODALITÀ DEL TRATTAMENTO – CONSERVAZIONE
      </h2>
      <p className="mb-4">
        Il trattamento sarà svolto in forma automatizzata, con modalità e
        strumenti volti a garantire la massima sicurezza e riservatezza, ad
        opera di soggetti di ciò appositamente incaricati. I dati saranno
        conservati per un periodo non superiore agli scopi per i quali i dati
        sono stati raccolti e successivamente trattati.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        AMBITO DI COMUNICAZIONE E DIFFUSIONE
      </h2>
      <p className="mb-4">
        I Suoi dati, oggetto del trattamento, non saranno diffusi e comunicati a
        soggetti terzi.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        NATURA DEL CONFERIMENTO E RIFIUTO
      </h2>
      <p className="mb-4">
        A parte quanto specificato per i dati di navigazione, l’utente è libero
        di fornire i dati personali. Il conferimento dei dati è facoltativo ma
        il loro mancato conferimento può comportare l’impossibilità di ottenere
        quanto richiesto o per usufruire dei servizi del titolare del
        trattamento.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        DIRITTI DEGLI INTERESSATI
      </h2>
      <p className="mb-4">
        Lei potrà far valere i propri diritti come espressi dagli artt. dal 12
        al 22 del G.D.P.R., rivolgendosi al titolare, sopra indicato e al DPO
        contattando la ns. sede al numero di telefono Tel +41764641358, oppure
        inviando una mail all’indirizzo{" "}
        <a
          href="mailto:amministrazione@datapartners.ch"
          className="text-blue-500 underline"
        >
          amministrazione@datapartners.ch
        </a>
        &nbsp;Lei ha il diritto, in qualunque momento, di ottenere la conferma
        dell’esistenza o meno dei dati e di conoscerne il contenuto e l’origine,
        verificarne l’esattezza o chiederne l’integrazione o l’aggiornamento,
        oppure la rettificazione (artt. dal 12 al 22 del G.D.P.R.). Ai sensi dei
        medesimi articoli si ha il diritto di chiedere la cancellazione, la
        trasformazione in forma anonima o il blocco dei dati trattati in
        violazione di legge, nonché di opporsi in ogni caso, per motivi
        legittimi, al loro trattamento.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        MODIFICHE ALL’INFORMATIVA SULLA PRIVACY
      </h2>
      <p>
        Il titolare si riserva il diritto di modificare, aggiornare, aggiungere
        o rimuovere parti della presente informativa sulla privacy a propria
        discrezione e in qualsiasi momento. La persona interessata è tenuta a
        verificare periodicamente le eventuali modifiche. Al fine di facilitare
        tale verifica l’informativa conterrà l’indicazione della data di
        aggiornamento dell’informativa. L’utilizzo del sito, dopo la
        pubblicazione delle modifiche, costituirà accettazione delle stesse.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">SOCIAL PLUG-IN</h2>
      <p>
        Le nostre pagine web contengono plug-in dei Social Networks (es.
        FaceBook.com, gestito da Facebook Inc., 1601 S. California Ave, Palo
        Alto, CA 94304, Stati Uniti (“Facebook”). Se si accede a una delle
        nostre 2 pagine web dotata di un simile plug-in, il browser Internet si
        collega direttamente al social e il plug-in viene visualizzato sullo
        schermo grazie alla connessione con il browser. Prima dell’utilizzo di
        tali Plug-in ti invitiamo a consultare la politica privacy degli stessi
        social networks, sulle loro pagine ufficiali.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
