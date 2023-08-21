import React, { useState, useEffect } from "react";
import { Label, Radio, Button } from "flowbite-react";
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const Form = ({ pyodideInstance }) => {
  const [formResponses, setFormResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [cypher, setCypher] = useState([0, 0]);
  const [questions, setQuestions] = useState([]);
  const [finalHtml, setFinalHtml] = useState(null);
  const [finalSubmitted, setFinalSubmitted] = useState(false)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const result = await fetch("https://api.oukcorp.com/questions");
        const data = await result.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptText = await (await fetch("/encrypt.py")).text();
    const namespace = await pyodideInstance.toPy({ form_json: JSON.stringify(formResponses) });
    const pyproxy = await pyodideInstance.runPythonAsync(scriptText, { globals: namespace });
    const cypherData = await pyproxy.toJs();
    setCypher(cypherData);
    setSubmitted(true);
  };

  const handleFinalSubmit = async () => {
    const uuid = cypher[1]
    const cyphertext = cypher[0]
    try {
      const response = await fetch(`https://api.oukcorp.com/decrypt/${uuid}/${cyphertext}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setFinalHtml(successAlert);
        setFinalSubmitted(true)
      } else {
        console.error("Failed to decrypt:", response);
      }
    } catch (error) {
      console.error("Error sending decryption request:", error);
    }
  };

  const successAlert = (
    <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Erfolgreiche Abstimmung!
      </AlertTitle>
      <AlertDescription maxWidth="sm">Ihre Stimme wurde berücksichtigt!</AlertDescription>
    </Alert>
  );

  const questionFieldset = (q) => (
    <fieldset key={q.id} className="flex max-w-md flex-col gap-4" id={`fieldset_${q.id}`}>
      <legend className="mb-4 font-bold">{q.text}</legend>
      <div className="flex items-center gap-2">
        <Radio
          id={`${q.id}_ja`}
          name={q.name}
          value="ja"
          onChange={(e) => {
            setFormResponses((prevResponses) => ({ ...prevResponses, [q.id]: e.target.value }));
          }}
        />
        <Label htmlFor={`${q.id}_ja`}>Ja</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio
          id={`${q.id}_nein`}
          name={q.name}
          value="nein"
          onChange={(e) => {
            setFormResponses((prevResponses) => ({ ...prevResponses, [q.id]: e.target.value }));
          }}
        />
        <Label htmlFor={`${q.id}_nein`}>Nein</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio
          id={`${q.id}_neutral`}
          name={q.name}
          value="neutral"
          onChange={(e) => {
            setFormResponses((prevResponses) => ({ ...prevResponses, [q.id]: e.target.value }));
          }}
        />
        <Label htmlFor={`${q.id}_neutral`}>Neutral</Label>
      </div>
    </fieldset>
  );
  

  return (
    <>
      {submitted ? (
        finalHtml
      ) : (
        <Box borderWidth="1px" borderRadius="lg" p={10}>
          <h3 className="font-extrabold text-2xl mb-5">Abstimmungsformular</h3>
          <form className="flex max-w-md flex-col gap-4 w-full h-full xl_" onSubmit={handleSubmit}>
            {questions.map(questionFieldset)}
            <Button type="submit">Daten validieren und verschlüsseln</Button>
          </form>
        </Box>
      )}

      {submitted && cypher[0] && !finalSubmitted && (
        <Box borderWidth="1px" borderRadius="lg" p={10}>
          <div className="flex flex-col gap-3 justify-center items-center">
            <h3 className="font-extrabold text-2xl ">Ihre Daten wurden tatsächlich verschlüsselt</h3>
            <p className="break-all line-clamp-6 w-1/3">{cypher[0].toString()}</p>
            <Button type="submit" onClick={handleFinalSubmit}>Verschlüsselte Daten senden</Button>
          </div>
        </Box>
      )}
    </>
  );
};

export default Form;
