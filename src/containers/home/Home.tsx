import { warnAlert } from "@/components/appComponents/appAlert";
// import {
//   Card,
//   CardContent,
//   // CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { messaging } from "@/firebase";
import { getToken } from "firebase/messaging";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import useDeviceTokenApi from "@/components/hooks/notificationAPI/deviceToken/setDeviceToken";

// const cardsData = [
//   {
//     title: "Foundation Module",
//     desc: "Foundation Module - foundation module è il fulcro del nostro API CENTRIC SAAS che permette la parametrizzazione e la segregazione dei permessi della visibilità dei dati e di tutte le funzionalità del tuo team di lavoro. In sintesi il tuo cockpit",
//   },
//   {
//     title: "Booking Card",
//     desc: "Booking card è il modulo per la gestione agile delle tue agenda e degli appuntamenti totalmente integrato con i tuoi asset digitali (es. sito, app) e i tuoi calendari (Google Workspace, Doodle, Outlook). In sintesi il tuo planner",
//   },
//   {
//     title: "Invoicing Card",
//     desc: "Rendi la gestione delle fatture un gioco da ragazzi con Invoicing Card. Il modulo perfetto per semplificare le tue operazioni finanziarie e mantenere la contabilità sotto controllo.",
//   },
//   {
//     title: "Scheduling",
//     desc: "Scheduling card è il modulo per la gestione della pianificazione del tuo team ed il controllo della produttività. In sintesi il controllore automatico dell’efficienza",
//   },
//   {
//     title: "DocAI",
//     desc: "DocAI è il modulo per ottimizzare le tue ricerche, le interrogazioni e lo splitting di file multipli, semplificando i tuoi processi di gestione dei documenti. In sintesi il tuo agente documentale",
//   },
//   {
//     title: "Genai Chatbot",
//     desc: "Genai Chatbot ti permette di sviluppare agenti specializzati in singoli task, utilizzando la tua knowledge base attuale o augmentata e sintentica. Sfrutta documenti, video, audio e fonti esterne per un’assistenza intelligente e completa.",
//   },
//   {
//     title: "Audit Trail",
//     desc: "Con Audit Trail, la Blockchain protegge l'integrità, la qualità e la tracciabilità dei tuoi dati. In altre parole, il tuo 'custode dei dati'.",
//   },
//   {
//     title: "Conservazione Sostitutiva",
//     desc: "Conservazione Sostitutiva è il modulo che assicura l'autenticità, l'integrità, la leggibilità e la reperibilità dei tuoi documenti digitali grazie alla nostra soluzione di conservazione digitale a norma. In sintesi, il tuo 'archivio legale'.",
//   },
//   {
//     title: "R4P Remote Devices Control",
//     desc: "Con Remote Devices Control, la manutenzione dei tuoi device non è mai stata così semplice. Monitora avvisi, allarmi e diagnostica a distanza per garantire operazioni sempre puntuali. Il tuo 'supervisore di manutenzione' ovunque ti trovi.",
//   },
//   {
//     title: "DFD: Diario di Bordo Digitale",
//     desc: "Digitalizza il diario di bordo della tua flotta di aerei o elicotteri con DFD. Garantisci la sicurezza delle tue informazioni e tieni tutto sotto controllo. In sintesi, il tuo 'diario di bordo digitale'.",
//   },
//   {
//     title: "Advanced Analytics (Sease Dashboard)",
//     desc: "Trasforma i tuoi dati in preziose informazioni con gli embedded analytics. Ottieni una business intelligence avanzata per ogni livello aziendale. Il tuo strumento ideale per decisioni informate e strategiche.",
//   },
// ];

const Home = () => {
  const [printToken, setToken] = useState("");

  const { userDetails } = useUserDetails();
  const userEmail = localStorage.getItem("email");

  const { setDeviceToken } = useDeviceTokenApi();

  useEffect(() => {
    requestPermission();
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Register the service worker as soon as the app loads
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js", {
            scope: "/firebase-cloud-messaging-push-scope",
          })
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
            if (registration.installing) {
              console.log("Service worker installing");
            } else if (registration.waiting) {
              console.log("Service worker installed");
            } else if (registration.active) {
              console.log("Service worker active");
            }
            // Include below mentioned validations
            if (!("PushManager" in window)) {
              console.log("Push messaging isn't supported.");
              return;
            }
            //
            if (Notification.permission === "denied") {
              console.log("The user has blocked notifications.");
              return;
            }
          })
          .catch((err) => {
            console.log("Service worker registration failed, error:", err);
          });
      });
    }
  }, []);

  const requestPermission = async () => {
    console.log("YOYO-REQ");
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BJiGpffy-15nEOP6tGHpaPE7JEqkdcdPKXEZ7ZABEyRGDllvIFMjv6cOi3m2oBDXq5r7fUa58Fq0lFZiScuWj7k",
        }).catch(async (err) => {
          const error =
            "AbortError: Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker";
          if (err.toString() === error) {
            const token = await getToken(messaging, {
              vapidKey:
                "BJiGpffy-15nEOP6tGHpaPE7JEqkdcdPKXEZ7ZABEyRGDllvIFMjv6cOi3m2oBDXq5r7fUa58Fq0lFZiScuWj7k",
            });
            return token;
          } else {
            throw err;
          }
        });
        if (token) {
          setToken(token);
          console.log(":::currentToken1", token);
          setDeviceToken({
            token: token,
          });
        } else {
          console.log("No registration token available.");
          requestPermission();
        }
      } else if (permission === "denied") {
        warnAlert(2000, "You have denied notification permissions!!");
      }
    }
    console.log(":::currentToken2", printToken, userEmail);
  };

  // const handleCardClick = (card: {
  //   code: string;
  //   html: string;
  //   linkType: string;
  // }) => {
  //   if (card.linkType === "EXTERNAL_LINK") {
  //     window.open(card.html, "_blank", "noreferrer");
  //   } else if (card.linkType === "IFRAME_LINK") {
  //     navigate("/pwa/iframePg", { state: { iframeLink: card.html } });
  //   } else {
  //     if (card.linkType === "INTERNAL_LINK") {
  //       if (card.code === "AMGDEMO_GENAI") {
  //         navigate("/pwa/gen-ai/gpt-prompt");
  //       } else if (card.code === "AMGPWA_PATBOOK") {
  //         navigate("/pwa/Booking/patientMeetings");
  //       } else {
  //         alert("card code error");
  //       }
  //     } else {
  //       alert("card linktype error");
  //     }
  //   }
  // };

  return (
    <div className="h-full p-2">
      <div className="h-full flex items-center justify-center px-4 py-2 text-lg font-semibold">
        <h1 className="text-4xl mb-8">
          Welcome {userDetails?.startList.users[0].nickName},
        </h1>
      </div>
      <div className="p-2 flex justify-center flex-wrap gap-5 mobile:max-sm:gap-1 mobile:max-sm:p-1">
        {/* {userDetails?.startList?.cards?.map((item, key) => {
          return (
            <Card
              className="rounded-xl bg-card-light-gray m-2 shadow-lg w-full"
              key={key}
            >
              <div className="px-4 pt-2">
                <CardHeader>
                  <div className="text-sm font-semibold text-text-light-gray">
                    {item.code}
                  </div>
                  <CardTitle className="text-text-blue">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {item.description}
                </CardContent>
              </div>
              <CardFooter>
                <button
                  className="bg-text-red p-3 px-8 rounded-md sm:text-xl text-white"
                  onClick={() => handleCardClick(item)}
                >
                  Start
                </button>
              </CardFooter>
            </Card>
          );
        })} */}

        {/* {cardsData.map((item, idx) => {
          return (
            <Card
              className="rounded-xl bg-card-light-gray m-2 shadow-lg w-full"
              key={idx}
            >
              <div className="px-4 pt-2">
                <CardHeader>
                  <div className="text-sm font-semibold text-text-light-gray">
                    {item.title}
                  </div>
                  <CardTitle className="text-text-blue">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">{item.desc}</CardContent>
              </div> */}
        {/* <CardFooter>
                <button
                  className="bg-text-red p-3 px-8 rounded-md sm:text-xl text-white"
                  // onClick={() => handleCardClick(item)}
                >
                  Start
                </button>
              </CardFooter> */}
        {/* </Card>
          );
        })} */}

        {/* <Card className="w-[250px] h-[350px]  ">
          <CardHeader className="bg-red-600 ">
            <CardTitle>GEN-AI</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum nulla
            perspiciatis veniam mollitia cupiditate libero debitis error, itaque
            ipsum impedit deserunt, distinctio vel ratione saepe natus nesciunt
            labore, corrupti facilis?
          </CardContent>
        </Card> */}
      </div>
      {/* <div className="break-all">{printToken}</div> */}
    </div>
  );
};
export default Home;
