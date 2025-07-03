'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DashboardBarChartProps {
    currentMonthListings: number;
    currentMonthOrders: number;
}

export default function DashboardBarChart({ currentMonthListings, currentMonthOrders }: DashboardBarChartProps) {
    // Generate last 6 months data
    const generateMonthsData = () => {
        const months = [];
        const currentDate = new Date();

        for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push(monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
        }

        return months;
    };

    // Mock data for previous 5 months (orders will be lower than listings)
    const mockPreviousListings = [15, 18, 22, 19, 25];
    const mockPreviousOrders = [8, 12, 14, 11, 17]; // Lower than listings

    const chartData = {
        labels: generateMonthsData(),
        datasets: [
            {
                label: 'Listings',
                data: [...mockPreviousListings, currentMonthListings],
                backgroundColor: '#9CA3AF', // darker gray
                borderColor: '#374151', // darker border
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.9,
            },
            {
                label: 'Orders',
                data: [...mockPreviousOrders, currentMonthOrders],
                backgroundColor: '#111827', // even darker, almost black
                borderColor: '#111827',
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.9,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: `Listings vs Orders (Conversion rate: ${(currentMonthOrders / currentMonthListings * 100).toFixed(2)}%)`,
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-sm border border-gray-200">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}
