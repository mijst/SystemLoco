'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { iDevice, iDeviceListResponse } from '../types';
import { formatDeviceName } from '../utils/formatters';

export default function DeviceList() {
  const [devices, setDevices] = useState<iDevice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/listDevices');
        if (!response.ok) throw new Error('Failed to fetch devices');
        const data: iDeviceListResponse = await response.json();
        setDevices(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch devices');
      } finally {
      }
    };

    fetchDevices();
  }, []);

  if (error) return (
    <div className="flex justify-center items-center p-8">
      <div className="text-center max-w-md">
        <div className="text-red-500 mb-4 text-lg">⚠️ {error}</div>
        <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Device List</h1>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 text-sm bg-gray-100 text-gray-400 rounded cursor-not-allowed"
            disabled
            title="Export functionality coming soon"
          >
            Export Data (.CSV)
          </button>
          <button 
            className="px-4 py-2 text-sm bg-gray-100 text-gray-400 rounded cursor-not-allowed"
            disabled
            title="Actions functionality coming soon"
          >
            Actions
          </button>
        </div>
      </div>

      <div className="flex gap-4 p-4 bg-gray-50 border-b">
        <button 
          className="px-4 py-2 text-sm bg-white text-gray-400 rounded border cursor-not-allowed"
          disabled
          title="Filters functionality coming soon"
        >
          Manage Filters
        </button>
        <button 
          className="px-4 py-2 text-sm bg-white text-gray-400 rounded border cursor-not-allowed"
          disabled
          title="Label functionality coming soon"
        >
          Label
        </button>
        <button 
          className="px-4 py-2 text-sm bg-white text-gray-400 rounded border cursor-not-allowed"
          disabled
          title="Model filter coming soon"
        >
          Model
        </button>
        <button 
          className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
          disabled
          title="Reset functionality coming soon"
        >
          Reset filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-4">
                <input 
                  type="checkbox" 
                  className="rounded opacity-50 cursor-not-allowed" 
                  disabled
                  title="Bulk selection coming soon"
                />
              </th>
              <th className="p-4">Status</th>
              <th className="p-4">Device Name / ID</th>
              <th className="p-4">Last Report</th>
              <th className="p-4">Address</th>
              <th className="p-4">Labels</th>
              <th className="p-4">Device Model</th>
              <th className="p-4">Firmware</th>
              <th className="p-4">Profile</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr 
                key={device.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="rounded opacity-50 cursor-not-allowed" 
                    disabled
                    title="Selection coming soon"
                  />
                </td>
                <td className="p-4">
                  <span className="flex h-2 w-2 bg-green-500 rounded-full"></span>
                </td>
                <td className="p-4">
                  <Link href={`/device/${device.id}`} className="text-blue-600 hover:underline">
                    {formatDeviceName(device)}
                  </Link>
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(device.lastReportTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="p-4">Storage Facility - Room 1</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded opacity-50 ">
                    Stock
                  </span>
                </td>
                <td className="p-4">{device.model.name}</td>
                <td className="p-4 text-gray-400">Z.2.44.2</td>
                <td className="p-4 text-gray-400">Storage</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <div className="text-sm text-gray-600">
          Showing 1-5 of {devices.length} devices
        </div>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 text-sm bg-gray-100 text-gray-400 rounded cursor-not-allowed"
            disabled
            title="Pagination coming soon"
          >
            Previous
          </button>
          <button 
            className="px-3 py-1 text-sm bg-gray-100 text-gray-400 rounded cursor-not-allowed"
            disabled
            title="Pagination coming soon"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
