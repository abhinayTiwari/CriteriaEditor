import React from 'react'
import './App.css';
import CriteriaDialog from './components/CriteriaDialog'


function App() {

  //xValues and yValues are the initial values which we send to the CriteriaDialog component
  const xValues:Array<number|string> = [0, 0.25, 1];
  const yValues:Array<number> = [1, -1, 0];

  //add your own onSave function to update the xValues and yValues in the aplication.
  //below is just a sample code to see that xVals and yVals can be accessed by onSave function
  const onSave=(xVals:Array<number|string>, yVals:Array<number>) => {
    console.log("Save Changes clicked")
    console.log(xVals, yVals);
  }

  return (
    <div className="App">
    <div className="App-header">
      <h2>Criteria Editor</h2>
    </div>
    <CriteriaDialog 
      title='Criteria Editor Dialog' 
      xLabel={'Distance'} 
      yLabel={'Score'} 
      xValues={xValues} 
      yValues={yValues} 
      onSave={onSave}
      />
    </div>
  );
}

export default App;


