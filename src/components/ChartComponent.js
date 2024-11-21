import React from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    PieController,
    Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PieController, ArcElement, Tooltip, Legend);

const ChartComponent = ({data}) => {
    // Data for Most Ordered Items Bar Chart
    const barData = {
        labels: data.mostOrderedItems.map(item => item.product),
        datasets: [
            {
                label: 'Quantity',
                data: data.mostOrderedItems.map(item => item.quantity),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    // Data for Order Status Distribution Pie Chart
    const pieData = {
        labels: Object.keys(data.orderStatusDistribution),
        datasets: [
            {
                data: Object.values(data.orderStatusDistribution),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div style={{height: "400px"}} className="widget p-10 shadow-lg rounded-lg bg-white">
                <h1>Most Ordered Items</h1>
                <Bar data={barData} options={{responsive: true, maintainAspectRatio: false}}/>
            </div>

            <div style={{height: "400px"}} className="widget p-10 shadow-lg rounded-lg bg-white">
                <h1>Order Status Distribution</h1>
                <Pie data={pieData} options={{responsive: true, maintainAspectRatio: false}}/>
            </div>
        </div>
    );
};

export default ChartComponent;
