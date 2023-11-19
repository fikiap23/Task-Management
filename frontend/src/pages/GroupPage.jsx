import { useState } from "react";
import "../css/file.css";
import GroupCard from "../components/Tools/Grouping/GroupCard";

function GroupPage() {
  const [inputText, setInputText] = useState("");
  const [numGroups, setNumGroups] = useState("");
  const [outputText, setOutputText] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  function test() {
    let lines = inputText.split(/\r?\n/).filter((line) => line.trim() !== "");
    let parsedNumGroups = parseInt(numGroups, 10);

    if (numGroups && inputText.trim() !== "") {
      //opsi 1
      if (selectedRadio === "opsi2") {
        if (!isNaN(parsedNumGroups) && parsedNumGroups > 0) {
          lines = shuffleArray(lines);
          let maxLinesPerGroup = Math.ceil(lines.length / parsedNumGroups);

          let newGroups = [];
          for (let i = 0; i < parsedNumGroups; i++) {
            let groupLines = lines.slice(
              i * maxLinesPerGroup,
              (i + 1) * maxLinesPerGroup
            );

            newGroups.push(`Group ${i + 1}:\n${groupLines.join("\n")}`);
          }

          setGroups(newGroups);
          setOutputText("");
        } else {
          alert("Please input a valid number of groups");
        }
        //opsi 2
      } else if (selectedRadio === "opsi1") {
        if (!isNaN(parsedNumGroups) && parsedNumGroups > 0) {
          lines = shuffleArray(lines);
          let maxLinesPerGroup = Math.ceil(lines.length / parsedNumGroups);

          let newGroups = [];
          for (let i = 0; i < maxLinesPerGroup; i++) {
            let groupLines = lines.slice(
              i * parsedNumGroups,
              (i + 1) * parsedNumGroups
            );

            newGroups.push(`Group ${i + 1}:\n${groupLines.join("\n")}`);
          }

          setGroups(newGroups);
          setOutputText("");
        } else {
          alert("Please input a valid number of groups");
        }
      } else {
        alert("Please select an option");
      }
    } else {
      alert("Please input text and a valid number of groups");
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const checkedRadio = (event) => {
    setSelectedRadio(event.target.id);
  };

  return (
    <>
      <h1 className="judul text-center">FITUR RANDOM GROUP</h1>
      <div className="grup">
        <h2>INPUT</h2>
        <textarea
          className="grup-area"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="isi nama"
        ></textarea>
        <br />
        <div className="grup">
          <label>
            <input
              type="radio"
              id="opsi1"
              name="opsi"
              onChange={checkedRadio}
              checked={selectedRadio === "opsi1"}
              required
            />
            Opsi 1. Per Kelompok Butuh Berapa Banyak Orang
          </label>
          <br />
          <label>
            <input
              type="radio"
              id="opsi2"
              name="opsi"
              onChange={checkedRadio}
              checked={selectedRadio === "opsi2"}
              required
            />
            Opsi 2. Butuh Berapa Banyak Kelompok (bagi rata)
          </label>
        </div>
        <input
          id="fill1"
          type="number"
          value={numGroups}
          onChange={(e) => setNumGroups(e.target.value)}
          placeholder="fill 1"
          hidden={selectedRadio !== "opsi1"}
        />
        <input
          id="fill2"
          type="number"
          value={numGroups}
          onChange={(e) => setNumGroups(e.target.value)}
          placeholder="fill 2"
          hidden={selectedRadio !== "opsi2"}
        />
        <button onClick={test} className="tombol-biru">
          GENERATE
        </button>
      </div>
      <div className="grup">
        <h2>OUTPUT</h2>
        <textarea
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          placeholder="isi nama"
          hidden={true}
        />
        <div className="container-card">
          {groups.map((group, index) => (
            <GroupCard key={index} group={group} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupPage;
