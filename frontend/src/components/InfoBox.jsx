import { Accordion, Button } from "flowbite-react";
import React from "react";

const InfoBox = () => {
  const infos = [
    {
      title: "Wozu dient diese Website?",
      description: (
        <div className="mb-2 text-gray-500 dark:text-gray-400">
          <p>
          Diese Website wurde im Rahmen meiner Maturaarbeit entwickelt, um ein konkretes Beispiel für den Einsatz von Kryptografie in einem elektronischen Wahlsystem (E-Voting) zu präsentieren.
          </p>
        </div>
      ),
    },
    {
      title: "Was ist ein Schlüssel und wie erhalte ich einen?",
      description: (
        <div className="flex items-start flex-col justify-center gap-3">
        <p className="mb-2 text-gray-500 text-justify">
            Ein <strong>Schlüssel</strong> ist ein <strong>essentielles</strong> Element der <strong>Kryptographie</strong>. Er kann mit dem Schlüssel eines <strong>Tresors</strong> verglichen werden.
            Jeder <strong>Wähler</strong> erhält seinen eigenen <strong>eindeutigen Schlüssel</strong>. 
        </p>
        <p className="mb-2 text-gray-500 text-justify">
            In diesem <strong>Wahlsystem</strong> wird ein <strong>„asymmetrischer Schlüssel“</strong> verwendet. Er hat eine interessante Besonderheit: Dieser Schlüssel (der öffentliche Schlüssel) 
            kann nur <strong>Daten verschlüsseln</strong> (den Tresor abschließen), aber nicht <strong>entschlüsseln</strong> (den Tresor öffnen). 
            Nur der Server (der Computer, der die Stimmen empfängt) besitzt den <strong>passenden speziellen Schlüssel</strong> (den privaten Schlüssel), der die Stimmen entschlüsseln kann.
        </p>
        <p className="mb-2 text-gray-500 text-justify">
            Nachdem Sie abgestimmt haben, löscht der Server den entsprechenden privaten Schlüssel zu Ihrem öffentlichen Schlüssel. 
            Dies bedeutet, dass Sie nur einmal abstimmen können, was die Integrität des Wahlprozesses gewährleistet.
            Auch die Anonymität ist gewährleistet, da der öffentliche Schlüssel, den der Wähler erhält, keine Informationen über ihn enthält.
            Der Server kann daher nicht wissen, wer abgestimmt hat.
        </p>
        <p className="mb-2 text-gray-500 text-justify">
            In einem <strong>idealen Szenario</strong> würde jeder Wähler einen eindeutigen Schlüssel über einen <strong>sicheren Kanal</strong> erhalten, 
            beispielsweise per <strong>Post</strong>. Allerdings ist es für diese Demonstration nicht möglich, die Benutzer vorab festzulegen. Daher ist es möglich, 
            direkt auf der Website einen eindeutigen Schlüssel zu generieren, zu illustrativen Zwecken.
        </p>
        <Button
            href="https://api.oukcorp.com/keys"
            download="cle_vote_demo"
        >
            Generieren Sie einen gültigen Schlüssel
        </Button>
    </div>
    

      ),
    },
    
    {
      title: "Lokale Verschlüsselung mit RSA",
      description: (
        <div className="mb-2 text-gray-500 dark:text-gray-400">
          <p>
              Eine der Schlüsselmerkmale dieser Website ist die lokale Verwendung des RSA-Verschlüsselungsalgorithmus zur Sicherung Ihrer Stimmen. 
              Wenn Sie Ihre Abstimmungsoptionen auswählen, wird die Verschlüsselung direkt in Ihrem Browser durchgeführt, und Ihre unverschlüsselten Auswahlmöglichkeiten
              verlassen niemals den Browser.
          </p>
        </div>
      ),
    },
    {
      title: "Verwendete Technologien für die Website",
      description: (
        <div className="mb-2 text-gray-500">
          <p className="mb-2">
            Die Website basiert auf einer Reihe moderner Technologien, die harmonisch zusammenarbeiten:
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>
              <p>
                <strong>Front-End:</strong> Der sichtbare Teil der Website wird mit <a href="https://reactjs.org/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">React</a> entwickelt,
                was eine reibungslose und interaktive Benutzererfahrung bietet.
              </p>
            </li>
            <li>
              <p>
                <strong>Design:</strong> Stil und Layout werden mit <a href="https://tailwindcss.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Tailwind CSS</a> erstellt.
                Für einige Komponenten werden auch <a href="https://flowbite.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Flowbite</a> und <a href="https://chakra-ui.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Chakra UI</a> verwendet, um eine optimale visuelle Erfahrung zu bieten.
              </p>
            </li>
            <li>
              <p>
                <strong>Kryptographie:</strong> Kryptografische Operationen werden unter Verwendung von <a href="https://pyodide.org/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Pyodide</a> verarbeitet,
                was die sichere Ausführung von Python-Code im Browser ermöglicht.
              </p>
            </li>
            <li>
              <p>
                <strong>Server:</strong> Der Serverteil wird von <a href="https://fastapi.tiangolo.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">FastAPI</a> angetrieben,
                einem leistungsstarken Python-Webframework. Zusätzlich wird <a href="https://redis.io/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Redis</a> für die Datenspeicherung verwendet.
              </p>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Ist der Quellcode verfügbar?",
      description: (
        <p className="mb-2 text-gray-500">
          Ja, der Quellcode der Website und des Servers ist auf <a 
            href="https://github.com"
            className="text-blue-600">
              GitHub
          </a> verfügbar.
        </p>
      )
    }
  ];

  return (
    <Accordion className="w-full sm:w-2/3 lg:w-1/2">
      {infos.map((info, index) => (
        <Accordion.Panel key={index}>
          <Accordion.Title>{info.title}</Accordion.Title>
          <Accordion.Content>{info.description}</Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
};

export default InfoBox;
