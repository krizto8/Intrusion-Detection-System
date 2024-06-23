import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Navbar from './Navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    values: [65, 59, 80, 81, 56, 55, 40],
  };

function ChartComponent () {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'IPs Captured',
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData.values,
        backgroundColor: 'rgba(255, 199, 232, 0.7)',
      },
    ],
  };

  return (
    <>
    <Navbar />
  <div className="chart" style={{display:"flex",justifyContent:"center",alignItems:"center",height:'60vh'}}>
    <Bar options={options} data={data}/>
</div>
</>
  )
};

export default ChartComponent;