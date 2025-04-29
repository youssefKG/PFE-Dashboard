import React from 'react';
import {
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Sales',
    value: '$45,231.89',
    change: '+20.1%',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Total Products',
    value: '2,345',
    change: '+12.5%',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Total Users',
    value: '1,234',
    change: '+8.2%',
    icon: UserGroupIcon,
  },
  {
    name: 'Total Orders',
    value: '567',
    change: '+15.3%',
    icon: ChartBarIcon,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">
                    New order received
                  </div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Order #12345 has been placed by John Doe
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 