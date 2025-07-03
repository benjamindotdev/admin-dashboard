'use client';

import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface DashboardPieChartProps {
    salesByCategory: Record<string, number>;
}

export default function DashboardPieChart({ salesByCategory }: DashboardPieChartProps) {
    const pieChartData = {
        labels: Object.keys(salesByCategory).map(cat =>
            cat.charAt(0).toUpperCase() + cat.slice(1)
        ),
        datasets: [
            {
                data: Object.values(salesByCategory),
                backgroundColor: [
                    '#9CA3AF', // Same mid grey as bar chart
                    '#9CA3AF',
                    '#9CA3AF',
                ],
                borderColor: '#FFFFFF', // White dividing lines
                borderWidth: 3,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Total Sales by Categories',
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-sm border border-gray-200">
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
    );
}
