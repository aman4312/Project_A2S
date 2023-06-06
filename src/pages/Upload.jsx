import React, { useState } from "react";
import sendFile from "../Piston";
import "./upload.css";

const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsText(file);
  });
};

const Upload = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("");
  const [compilationError, setCompilationError] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [output, setOutput] = useState([]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async () => {
    if (file && language) {
      try {
        const fileContent = await readFileContent(file);
        const result = await sendFile(language, fileContent);
        setCompilationError(result.compile.stderr);
        setRuntimeError(result.run.stderr);
        setOutput(result.run.output.split("\n"));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClear = () => {
    setFile(null);
    setCompilationError("");
    setRuntimeError("");
    setOutput([]);
    setLanguage("");
  };

  return (
    <>
      <div className="w-[300px] m-auto">
        <h1 className="text-center text-2xl font-bold pt-12">Upload Files</h1>
      </div>

      <div className="w-[500px] m-auto">
        <label
          htmlFor="languages"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <select
          id="languages"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleLanguageChange}
          value={language}
        >
          <option selected value="">
            Choose a Language
          </option>
          <option value="c">C</option>
          <option value="c++">C++</option>
          <option value="python">Python</option>
          <option value="js">Javascript</option>
          <option value="go">Go</option>
          <option value="java">Java</option>
        </select>
        <label
          className="block mb-5 text-md font-medium text-gray-900 dark:text-gray-300"
          htmlFor="file_input"
        ></label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
          id="file_input"
          type="file"
          onChange={handleFileChange}
        />
        <br />
        <center>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </center>
      </div>

      <div className="w-1/2 m-auto py-5">
        <table>
          <tr>
            <th>
              <h1 className="text-2xl font-bold pt-12">Compilation Error</h1>
            </th>
            <th>
              <h1 className="text-2xl font-bold pt-12">Runtime Error</h1>
            </th>
            <th>
              <h1 className="text-2xl font-bold pt-12">Output</h1>
            </th>
          </tr>
          <tr>
            <td>{compilationError}</td>
            <td>{runtimeError}</td>
            <td>
              {output.map((line) => (
                <>
                  <p>{line}</p>
                  <hr />
                </>
              ))}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Upload;
