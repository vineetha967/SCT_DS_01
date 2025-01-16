import React, { useState } from 'react';
import { BarChart, RefreshCcw } from 'lucide-react';

// Sample data - you can replace this with real data
const generateRandomData = () => {
  return [
    { age: '0-10', count: Math.floor(Math.random() * 100) + 50 },
    { age: '11-20', count: Math.floor(Math.random() * 100) + 50 },
    { age: '21-30', count: Math.floor(Math.random() * 100) + 50 },
    { age: '31-40', count: Math.floor(Math.random() * 100) + 50 },
    { age: '41-50', count: Math.floor(Math.random() * 100) + 50 },
    { age: '51-60', count: Math.floor(Math.random() * 100) + 50 },
    { age: '61-70', count: Math.floor(Math.random() * 100) + 50 },
    { age: '71+', count: Math.floor(Math.random() * 100) + 50 },
  ];
};

function App() {
  const [data, setData] = useState(generateRandomData());
  const maxCount = Math.max(...data.map(d => d.count));

  const refreshData = () => {
    setData(generateRandomData());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart className="w-8 h-8 text-blue-500" />
              Population Age Distribution
            </h1>
            <p className="text-gray-600 mt-2">
              Sample distribution of population by age groups
            </p>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>

        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.age} className="relative">
              <div className="flex items-center gap-4">
                <div className="w-16 text-right font-medium text-gray-700">
                  {item.age}
                </div>
                <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-lg transition-all duration-500 ease-out"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                    }}
                  >
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center px-3">
                      <span className="text-white font-medium">
                        {item.count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>* Data is randomly generated for demonstration purposes</p>
        </div>
      </div>
    </div>
  );
}

export default App;