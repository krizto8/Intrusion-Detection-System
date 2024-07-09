import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Chart, Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Necessary for chart.js v3
import "./table.css"; 
import Navbar from './Navbar';




const MyComponent = () => {
    const [shouldBlink, setShouldBlink] = useState(false);
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: ['rgba(253,29,29, 0.8)'],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = io.connect('http://localhost:3000/test');
        console.log(socket);

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        // Receive details from the server
        socket.on('newresult', (msg) => {
            console.log("Received result: ", msg.result);
            console.log(msg.result[12].level);

            // Maintain a list of twenty messages
            setMessagesReceived(prevMessages => {
                const updatedMessages = [...prevMessages, msg.result];
                if (updatedMessages.length > 20) {
                    updatedMessages.shift();
                }
                return updatedMessages;
            });

            if (msg.result[10] != "Benign") {
                setShouldBlink(true);
              } else {
                setShouldBlink(false);
              }

            // Update chart data
            const newLabels = msg.ips.map(ipData => ipData.SourceIP);
            const newData = msg.ips.map(ipData => ipData.count);

            // Define gradient background
            const gradient = document.createElement("canvas").getContext("2d").createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(131,58,180,1)');
            gradient.addColorStop(0.5, 'rgba(253,29,29,1)');
            gradient.addColorStop(1, 'rgba(252,176,69,1)');

            setChartData({
                labels: newLabels,
                datasets: [{
                    ...chartData.datasets[0],
                    data: newData,
                    backgroundColor: gradient // Apply gradient background
                }]
            });
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const renderImage = (imgData) => {
      if (!imgData) return null;
      return (
          <img
              src={imgData.src}
              className={imgData.class}
              height={imgData.height}
              style={{ marginBottom: imgData.style }}
              title={imgData.title}
              alt=""
          />
      );
  };

    return (
      <>
      {console.log(shouldBlink)}
      
      <Navbar />
      <div className={shouldBlink ? 'blinking-background' : ''}>
        <div className='main-heading'>
            <h1>Live Traffic</h1>
            <div className="chart" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '60vh' }}>
                <Bar data={chartData} options={{
                  plugins:{
                    legend: { display: false},
                    scales: {
                      yAxes: [{
                          ticks: { beginAtZero: true }
                      }]
                  }}
                    
                }} style={{ backgroundColor: 'white' }} />
            </div>
            <div id="wrapinfo"><span id="capinfo">Captured Packet Info</span></div>
            <div id="table">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Flow ID</th><th scope="col">Src IP</th><th scope="col">Src Port</th><th scope="col">Dst IP</th><th scope="col">Dst Port</th><th scope="col">Protocol</th>
                            <th scope="col">Flow start time</th><th scope="col">Flow last seen</th><th scope="col">App name</th><th scope="col">PID</th>
                            <th scope="col">Prediction</th><th scope="col">Prob</th><th scope="col">Risk</th><th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messagesReceived.map((message, index) => (
                            
                            <tr key={index}>
                                {message.slice(0, -1).map((item, subIndex) => (
                                  
                                    <td key={subIndex}>{subIndex == 1 || subIndex == 3 ? (item.ip) :( item.toString())}</td>
                                ))}
                                <td style={{ color: message[message.length - 1].color }}>{message[message.length - 1].level}</td>
                                <td>
                                    <Link to={`/flow-detail/${message[0].toString()}`}>
                                        <div>Detail</div>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        </>
    );
};

export default MyComponent;
