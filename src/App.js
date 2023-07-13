/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";

function App() {

  const feet_20 = {
    length: 589,
    width: 234,
    height: 238,
    max_cbm: 26,
  };
  const feet_40 = {
    length: 1200,
    width: 234,
    height: 238,
    max_cbm: 58,
  };
  const highcube_40 = {
    length: 1200,
    width: 234,
    height: 269,
    max_cbm: 68,
  };  

  const [inputFields, setInputFields] = useState([
    { name: "", length: "", width: "", height: "", quantity: "", weight: "" },
  ]);

  const [cbmValues, setcbmValues] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);

    const cbm = calculateCBM(data[index]);
    let cbmData = [...cbmValues];
    cbmData[index] = cbm;
    setcbmValues(cbmData);
  };

  const calculateCBM = (data) => {
    const { length, width, height, quantity } = data;
    const cbm = (length * width * height * quantity) / 1000000;
    return cbm.toFixed(2);
  };

  let feet20Sum = 0
  let feet40Sum = 0
  let hq40Sum = 0
  let resultString = ``

  const calculateContainers = (totCBM) => {

    if (totCBM <= feet_20.max_cbm) {
      feet20Sum += 1;
      console.log(feet20Sum)
      resultString += `| 20ft container : ${feet20Sum} | `

    }
    else if (feet_20.max_cbm < totCBM && totCBM <= feet_40.max_cbm) {
      feet40Sum += 1;
      console.log(feet40Sum)
      resultString += `| 40ft container : ${feet40Sum} | `


    } 
    else if (feet_40.max_cbm < totCBM && totCBM <= highcube_40.max_cbm) {
      hq40Sum += 1;
      console.log(hq40Sum)
      resultString += `| 40hq container : ${hq40Sum} | `


    } 
    else if (totCBM > highcube_40.max_cbm) {
      let temp1 = Math.floor((totCBM / highcube_40.max_cbm).toFixed(2));
      let temp2 = totCBM%highcube_40.max_cbm
      if(temp2===0){
        resultString += `| 40hq container : ${temp1} | `
      }
      else{
        calculateContainers(temp2);
        resultString += `| 40hq container : ${temp1} | `
      }
      // calculateContainers(temp1);

    } else {
      console.log("error side")
      return <h1>The given cbm is invalid</h1>;
    }
    return resultString
  };

  const addFields = () => {
    let newfield = {
      name: "",
      length: "",
      width: "",
      height: "",
      quantity: "",
      weight: "",
    };

    setInputFields([...inputFields, newfield]);
  };

  const calculateTotalCBM = () => {
    const totalCBM = cbmValues.reduce((sum, cbm) => sum + parseFloat(cbm), 0);
    return totalCBM.toFixed(2);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);

    let cbmData = [...cbmValues];
    cbmData.splice(index, 1);
    setcbmValues(cbmData);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    console.log(cbmValues);
    console.log("Total CBM:", calculateTotalCBM());
    setShowResult(true);
  };

  const resetForm = () => {
    setInputFields([{ name: "", length: "", width: "", height: "", quantity: "", weight: "" }]);
    setcbmValues([]);
    setShowResult(false);
  };

  return (
    <div className="App">
      <h1>Load Calculator</h1>
      <form>
        {inputFields.map((input, index) => {
          return (
            <div key={index} className="form-section">
              <div className="input-section">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="input-section">
                <label>Length (CM)</label>
                <input
                  name="length"
                  placeholder="length"
                  value={input.length}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="input-section">
                <label>Width (CM)</label>
                <input
                  name="width"
                  placeholder="width"
                  value={input.width}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="input-section">
                <label>Height (CM)</label>
                <input
                  name="height"
                  placeholder="height"
                  value={input.height}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="input-section">
                <label># of units</label>
                <input
                  name="quantity"
                  placeholder="quantity"
                  value={input.quantity}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <div className="input-section">
                <label>Weight <span>(in kg)</span></label>
                <input
                  name="weight"
                  placeholder="weight"
                  value={input.weight}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <button id='remove' onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <div className="button-section">
        <button onClick={addFields}>Add More..</button>
        <button onClick={submit}>Submit</button>
        <button onClick={resetForm}>Reset</button>
      </div>

      <div className="Logic">
        {showResult && (
          <div>
            <span className="text-color"> Total CBM:{calculateTotalCBM()}</span><br></br>
            <h3>{calculateContainers(parseFloat(calculateTotalCBM()))} </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
