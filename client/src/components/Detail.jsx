import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';
import imgURL from "../assets/gears-spinner.svg"
import "./Detail.css";
import Navbar from "./Navbar";


const Detail = () => {
    const { flowId } = useParams();

    const [flowData, setFlowData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const details = async () =>{
            try {
                const response = await fetch(`http://localhost:3000/api/flow-detail?flow_id=${flowId}`);
                console.log(response);
                if (!response.ok) {
                  throw new Error('Failed to fetch flow detail');
                }
                const data = await response.json();
                setFlowData(data);
              } catch (err) {
                setError(err);
              }
        }

        details();

    },[flowId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!flowData) {
        return <div className="loader"><img src={imgURL} style={{height:'120px',width:'120px'}}/></div>
    };

    console.log(flowData);
    const flow = flowData.flow[0];

    return (
        <>
        <Navbar />
        <div className="explainer">

        </div>
        <div className="risk-analysis">Risk Assessment :&nbsp; <span style={{color:flowData.risk.color}}>  {flowData.risk.level}</span></div>
    <div className="two-plots">
            <div className="plot1">
            <Plot
    data={[
        {
            x: flowData.exp["predict_proba"].slice().reverse(),
            y: flowData.exp["class_names"].slice().reverse(),
            type: 'bar',
            orientation: 'h', // Invert the chart by setting orientation to 'h' (horizontal)
            marker: {
                color: ['#7f7f7f', '#ff7f0e', '#a02c72', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#208a41'], // Example colors
                width: 1 // Bar width (optional)
            }
        }
    ]}
    layout={{ 
        title: 'Class Probabilities',
        xaxis: { title: 'Probability' }, // Label for the x-axis
        yaxis: { title: 'Class' }, // Label for the y-axis
        margin: { l: 150 }, // Adjust left margin to accommodate y-axis labels
    }}/>

            </div>
            <div className="plot2">
                <Plot
                data={[
                {
                    x: flowData.plot_data.x[0],
                    y: flowData.plot_data.y[0],
                    type: 'bar'
                }
                ]}
                layout={{ title: 'Ranking features by reconstruct error by Auto Encoder' }}/>
            </div>
</div>
    
      <div className="list-head"><span>Features Used for Analysis</span></div>
      <div id="detail-table">
      <table className="table" >
        <thead><th>Features</th><th>Values</th></thead>
        <tbody>
          {Object.entries(flow).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td >{typeof value === 'object' ? flowData.risk.level : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      
    
    </>

    );


    

};

export default Detail;