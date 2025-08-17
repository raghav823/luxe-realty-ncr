// Location: src/components/dashboard/builder/Analytics.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, MessageCircle, DollarSign, Calendar, Filter } from 'lucide-react';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalViews: 0,
      totalInquiries: 0,
      totalRevenue: 0,
      conversionRate: 0
    },
    monthlyData: [],
    propertyViews: [],
    inquiryTrends: [],
    revenueBreakdown: []
  });
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/builders/analytics?range=${dateRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback mock data for development
      setAnalyticsData({
        overview: {
          totalViews: 12543,
          totalInquiries: 287,
          totalRevenue: 15000000,
          conversionRate: 2.3
        },
        monthlyData: [
          { month: 'Jan', views: 1200, inquiries: 25, revenue: 2000000 },
          { month: 'Feb', views: 1800, inquiries: 35, revenue: 2500000 },
          { month: 'Mar', views: 2200, inquiries: 42, revenue: 3200000 },
          { month: 'Apr', views: 1900, inquiries: 38, revenue: 2800000 },
          { month: 'May', views: 2500, inquiries: 48, revenue: 3800000 },
          { month: 'Jun', views: 2800, inquiries: 52, revenue: 4200000 }
        ],
        propertyViews: [
          { property: 'Luxury Villa A', views: 3200, inquiries: 45 },
          { property: 'Modern Apartment B', views: 2800, inquiries: 38 },
          { property: 'Commercial Plaza C', views: 2400, inquiries: 32 },
          { property: 'Penthouse Suite D', views: 2000, inquiries: 28 },
          { property: 'Garden Villa E', views: 1800, inquiries: 24 }
        ],
        inquiryTrends: [
          { day: 'Mon', inquiries: 12 },
          { day: 'Tue', inquiries: 15 },
          { day: 'Wed', inquiries: 18 },
          { day: 'Thu', inquiries: 14 },
          { day: 'Fri', inquiries: 22 },
          { day: 'Sat', inquiries: 28 },
          { day: 'Sun', inquiries: 20 }
        ],
        revenueBreakdown: [
          { category: 'Villas', value: 45, amount: 6750000 },
          { category: 'Apartments', value: 35, amount: 5250000 },
          { category: 'Commercial', value: 20, amount: 3000000 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change, format = 'number' }) => {
    const formatValue = (val) => {
      if (format === 'currency') {
        return `₹${(val / 10000000).toFixed(1)}Cr`;
      } else if (format === 'percentage') {
        return `${val}%`;
      }
      return val.toLocaleString();
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{formatValue(value)}</p>
            {change && (
              <p className={`text-sm flex items-center mt-2 ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {change > 0 ? '+' : ''}{change}% from last month
              </p>
            )}
          </div>
          <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-8 h-8" style={{ color }} />
          </div>
        </div>
      </div>
    );
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Views"
          value={analyticsData.overview.totalViews}
          icon={Eye}
          color="#3B82F6"
          change={15}
        />
        <StatCard
          title="Total Inquiries"
          value={analyticsData.overview.totalInquiries}
          icon={MessageCircle}
          color="#10B981"
          change={8}
        />
        <StatCard
          title="Total Revenue"
          value={analyticsData.overview.totalRevenue}
          icon={DollarSign}
          color="#F59E0B"
          change={23}
          format="currency"
        />
        <StatCard
          title="Conversion Rate"
          value={analyticsData.overview.conversionRate}
          icon={TrendingUp}
          color="#8B5CF6"
          change={-2}
          format="percentage"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') {
                    return [`₹${(value / 1000000).toFixed(1)}M`, 'Revenue'];
                  }
                  return [value, name === 'views' ? 'Views' : 'Inquiries'];
                }}
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="views" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="views"
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="inquiries" 
                stroke="#10B981" 
                strokeWidth={2}
                name="inquiries"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.revenueBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category} (${value}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.revenueBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `₹${(props.payload.amount / 10000000).toFixed(1)}Cr (${value}%)`,
                  'Revenue'
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Properties</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.propertyViews} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="property" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="views" fill="#3B82F6" name="Views" />
              <Bar dataKey="inquiries" fill="#10B981" name="Inquiries" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Inquiry Trends */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Inquiry Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.inquiryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inquiries" fill="#F59E0B" name="Inquiries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-900">Peak Performance</h4>
            </div>
            <p className="text-sm text-blue-700">
              Your properties perform best on weekends. Consider promoting special offers during Friday-Sunday.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Eye className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-medium text-green-900">High Engagement</h4>
            </div>
            <p className="text-sm text-green-700">
              Luxury Villa A has the highest view-to-inquiry ratio. Use similar marketing strategies for other properties.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 text-yellow-600 mr-2" />
              <h4 className="font-medium text-yellow-900">Revenue Opportunity</h4>
            </div>
            <p className="text-sm text-yellow-700">
              Commercial properties show potential for growth. Consider expanding your commercial portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                Property "Modern Apartment B" received 45 new views today
              </span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                3 new inquiries for "Luxury Villa A"
              </span>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                Weekly analytics report generated
              </span>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;