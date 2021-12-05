import { useState } from 'react';
import logo from '../../logo.svg';
import './randomizer.css';

function Randomizer() {
  const [allData, setAllData] = useState([]);
  const [dataInUse, setDataInUse] = useState([]);
  const [inputValue, setInptValue] = useState("")
  const [selectedData, setSelectedData] = useState("Randomizer")
  const [toggleSettings, setToggleSettings] = useState(true)
  const [mode, setMode] = useState("withReplacement")

  const handleInputChange = (e) => {
    setInptValue(e.target.value)
  }
  const addnput = () => {
    if (inputValue) {
      const temp1 = [...allData]
      const temp2 = [...dataInUse]
      temp1.push(inputValue)
      temp2.push(inputValue)
      setAllData(temp1)
      setDataInUse(temp2)
      setInptValue("")
    }
  }
  const randomize = () => {
    setSelectedData("")
    const temp = [...dataInUse]
    const random = Math.floor(Math.random() * (temp.length))
    //  Math.floor(Math.random() * (temp.length - 0 + 1) + 0)
    const currentData = temp[random]

    const index = temp.indexOf(currentData);
    if (temp.length) {
      setTimeout(() => {
        setSelectedData(currentData)
      }, 1200);
    } else {
      setSelectedData("Randomizer")
    }
    if (mode === "withReplacement" && (index > -1)) {
      temp.splice(index, 1);
    }
    setDataInUse(temp)
  }
  const reset = () => {
    setAllData([])
    setDataInUse([])
    setInptValue("")
    setSelectedData("Randomizer")
    setToggleSettings(false)
  }
  const resetDataInUse = () => {
    const temp = [...allData]
    setDataInUse(temp)
  }
  return (
    <div className="Randomizer">
      <h1 className="p1 result flex">
        {selectedData ? selectedData : <img src={logo} className="App-logo" alt="logo" />}
      </h1 >
      <button className="p1" onClick={randomize}>Randomizer</button>
      <br />
      <br />
      <div className={`${toggleSettings ? "b1-white p1" : null}`} >
        <button className="p1" onClick={() => setToggleSettings(!toggleSettings)}>{toggleSettings ? "Minimize Settings" : "Expand  Settings"}</button>
        <br />
        <br />
        {toggleSettings ? <>
          <label> Mode: &nbsp;
            <select className="p1" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option className="p1" value="withReplacement">With Replacement</option>
              <option className="p1" value="withoutReplacement">Without Replacement</option>
            </select>
          </label>
          <br />
          <br />
          <div>
            <input className="p1 mr2" value={inputValue} onChange={handleInputChange} autoFocus placeholder="Type Something Here!" />
            <button className="p1 mr2" onClick={addnput}>Add</button>
            <button className="p1" onClick={reset}>Reset</button>
          </div>
        </> : null}
      </div>
      {/* {mode==="withReplacement"? */}
      <div>
        <div className="flex">
          <p className="mr2">Data In Use</p>
          <button onClick={resetDataInUse}>Reset</button>
        </div>
        <div className="b1-white flex">
          {dataInUse.map((data, index) => <span key={index} className="p1">{data}</span>)}
        </div>
      </div>
      {/* :null} */}
      <div>
        <p>All Data</p>
        <div className="b1-white flex">
          {allData.map((data, index) => <span key={index} className="p1">{data}</span>)}
        </div>
      </div>
    </div>
  );
}

export default Randomizer;
