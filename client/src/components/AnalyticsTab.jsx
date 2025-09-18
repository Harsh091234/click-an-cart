import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AnalyticsSkeleton from "./skeletons/AnalyticsSkeleton";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-md p-4 shadow border border-sky-100">
        <h2 className="text-lg font-semibold text-sky-700 mb-3">
          Sales & Revenue Overview
        </h2>
        <div className="recharts-wrapper">
            <ResponsiveContainer
          width="100%"
          height={270}
          className="recharts-surface"
        >
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis yAxisId="left" stroke="#6B7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#0EA5E9"
              activeDot={{ r: 6 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#0369A1"
              activeDot={{ r: 6 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
          </div>        
      
      </div>
    </div>
  );
};

export default AnalyticsTab;

// Card Component
const AnalyticsCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-md p-4 shadow border border-sky-100 relative overflow-hidden">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sky-500 text-xs mb-1 font-semibold">{title}</p>
        <h3 className="text-gray-900 text-xl font-bold">{value}</h3>
      </div>
      <div className="text-sky-400 opacity-20">
        <Icon className="h-12 w-12" />
      </div>
    </div>
  </div>
);
