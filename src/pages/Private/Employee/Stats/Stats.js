import React, {useState} from 'react';
import AccountLayout from "../../../../components/AccountLayout";
import ChartComponent from "../../../../components/ChartComponent";
import {useForm} from "react-hook-form";
import {StatsAPI} from "../../../../api/StatsAPI";

export const Stats = () => {
    const [chartData, setChartData] = useState();

    const {register, watch, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (formData) => {
        const {data} = await StatsAPI.fetch(formData);
        setChartData(data);
    }
    return (
        <AccountLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="flex pb-3 items-center space-x-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        {...register('startDate', {required: true})}
                    />
                    {errors.startDate && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        {...register('endDate', {required: true})}
                    />
                    {errors.endDate && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                <div>
                    <br/>
                    <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>

            {chartData &&
                <div style={{height: "300px"}}>
                    <div className="widget p-4 shadow-lg rounded-lg bg-white">
                        <div className="stat">
                            <div className="stat-title text-gray-500">Total Sales Money</div>
                            <div className="stat-value text-xl">$<span
                                id="totalSalesMoney">{chartData.totalSalesMoney}</span></div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-gray-500">Order Count</div>
                            <div className="stat-value text-xl"><span id="orderCount">{chartData.orderCount}</span>
                            </div>
                        </div>
                        <div class="stat">
                            <div class="stat-title text-gray-500">Average Order Value</div>
                            <div class="stat-value text-xl">$<span
                                id="averageOrderValue">{chartData.averageOrderValue.toFixed(2)}</span></div>
                        </div>
                    </div>

                    <ChartComponent data={chartData}/>
                </div>
            }
        </AccountLayout>
    );
};
