import React from 'react';
import { toast } from 'react-toastify';

function KeyInput({ pyodideInstance, setValidKey }) {
  const testKey = async (acceptedFiles) => {
    try {
      const acceptedText = await acceptedFiles[0].text();
      const scriptText = await (await fetch('/check_key.py')).text();
      const myNamespace = await pyodideInstance.toPy({ text_file: acceptedText });
      const pyproxy = await pyodideInstance.runPythonAsync(scriptText, { globals: myNamespace });
      const result = await pyproxy.toJs();
      if (result.get("valid")) {
        setValidKey(true);
      } else {
        throw new Error("Invalid key");
      }
    } catch (error) {
      throw error;
    }
  };

  const getKey = async (acceptedFiles) => {
    try {
      await toast.promise(
        testKey(acceptedFiles),
        {
          pending: "Laden",
          success: "Der Schlüssel ist gültig!",
          error: "Dieser Schlüssel ist ungültig."
        }
      );
    } catch (error) {
      throw error
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <label className="inline-block text-neutral-70 text-2xl font-extrabold">
        Legen Sie Ihren Schlüssel ein, um die Abstimmung zu starten
      </label>
      <input
        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
        type="file"
        onChange={(e) => getKey(e.target.files)}
      />
    </div>
  );
}

export default KeyInput;
