import React from 'react'
import {Line,Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,Filler, ArcElement, scales } from 'chart.js';
import { lightBlack, lightPurple, matBlack, purple } from '../../constants/color.js';
import { getLast7Days } from '../../lib/feature.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title,Filler, Tooltip, Legend,ArcElement);


const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false,
        },
    },
    scales: {
        
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
}
const DoughnutChartOptions = {
  responsive: true,
  plugins: {
      legend: {
          display: false
      },
  
  },
  cutout:120,
}

const labels  = getLast7Days();

const LineChart = ({valueArray=[]}) => {
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Tasks',
            data:valueArray,
            fill:true,
            backgroundColor:lightPurple,
            borderColor:lightBlack,
          }
        ],
    }

  return (
    <Line
      data={data}
      options={lineChartOptions}

    />
  )
}


const DoughnutChart = ({valueArray=[],labels=[]}) => {

    const data = {
        labels: labels,
        datasets: [
          {
            data:valueArray,
            fill:true,
            backgroundColor:[lightPurple,lightBlack],
            borderColor:[lightPurple,lightBlack],
            hoverBackgroundColor:[purple,matBlack],
            offset:25,
          }
        ],
    }
  return (
    <Doughnut 
        data={data}
        options={DoughnutChartOptions}
        style={{zIndex:1000}}
    />
  )
}

export {LineChart,DoughnutChart}