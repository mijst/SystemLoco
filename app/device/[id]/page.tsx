'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useDevice } from '../../../hooks/useDevice';
import {
  ArrowLeft,
  Battery,
  AlertTriangle,
  Clock,
  Tag,
  Plus,
  MapPin,
  Thermometer,
  Sun,
  Droplets,
  Edit2,
  Box,
  Cpu,
  RefreshCcw,
  History,
  FileText,
  Settings,
  WrenchIcon,
  Bell,
  AlertCircle,
} from 'lucide-react';

interface TabProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  disabled?: boolean;
}

const Tab = ({ label, icon, isActive, disabled = true }: TabProps) => (
  <button
    className={`px-4 py-2 border-b-2 flex items-center gap-2 ${
      isActive 
        ? 'border-blue-500 text-blue-500' 
        : disabled 
          ? 'border-transparent text-gray-400 cursor-not-allowed' 
          : 'border-transparent hover:border-gray-300'
    }`}
    disabled={disabled}
    title={disabled ? "Coming soon" : ""}
  >
    {icon}
    {label}
  </button>
);
const TimeAgo = ({ date }: {date: string}) => (
  <div className="flex items-center gap-1 text-gray-500">
    <Clock className="w-4 h-4" />
    <span>{new Date(date).toLocaleTimeString()}</span>
  </div>
);

export default function DeviceDetail({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = use(paramsPromise);
  const { device, error} = useDevice(params.id);

  if (error || !device) {
    return null;
  }
  const tabs = [
    { label: "Overview", icon: <Box className="w-4 h-4" />, isActive: true, disabled: false },
    { label: "History", icon: <History className="w-4 h-4" />, isActive: false },
    { label: "Reports & Audit", icon: <FileText className="w-4 h-4" />, isActive: false },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, isActive: false },
    { label: "Technical Information", icon: <WrenchIcon className="w-4 h-4" />, isActive: false },
    { label: "Subscriptions", icon: <Bell className="w-4 h-4" />, isActive: false }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="p-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800 gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              {device.name || `Device ${device.id.slice(-4)}`}
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map(tab => (
              <Tab key={tab.label} {...tab} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[2000px] mx-auto px-4">
        <div className="flex flex-wrap gap-6 py-6 justify-center">
          <div className="flex-1 min-w-[300px] max-w-[400px] space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Box className="w-5 h-5" />
              Summary
            </h2>
            <div className="space-y-4 bg-white rounded-lg border p-4">
              <div>
                <div className="text-sm text-gray-500">Device ID</div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-gray-400" />
                  {device.id}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Device Name</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-gray-400" />
                    {device.name || 'Unnamed Device'}
                  </div>
                  <button 
                    className="text-sm text-blue-500 opacity-50 cursor-not-allowed hover:bg-gray-50 p-1 rounded"
                    disabled
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Model</div>
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-gray-400"/>
                  {device.model.name}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Profile</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Box className="w-4 h-4" />
                    Storage
                  </div>
                  <button 
                    className="text-sm text-blue-500 opacity-50 cursor-not-allowed hover:bg-gray-50 p-1 rounded"
                    disabled
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Firmware</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Cpu className="w-4 h-4" />
                    Z.2.44.2
                  </div>
                  <button 
                    className="text-sm text-blue-500 opacity-50 cursor-not-allowed hover:bg-gray-50 p-1 rounded"
                    disabled
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[300px] max-w-[400px] space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Status
            </h2>
            <div className="space-y-4 bg-white rounded-lg border p-4">
              <div>
                <div className="text-sm text-gray-500">Battery Level</div>
                <div className="flex items-center gap-2 text-green-500">
                  <Battery className="w-4 h-4" />
                  100%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status Messages</div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="w-4 h-4" />
                  GPS failure
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Report</div>
                <div className="space-y-1">
                  <TimeAgo date={device.lastReportTime} />
                  <button 
                    className="text-sm text-blue-500 opacity-50 cursor-not-allowed flex items-center gap-1"
                    disabled
                  >
                    <FileText className="w-4 h-4" />
                    View Report
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5" />
                Labels
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-yellow-50 text-yellow-800 text-sm rounded-full border border-yellow-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Fixed Location
                </span>
                <button 
                  className="px-3 py-1.5 bg-gray-50 text-gray-400 text-sm rounded-full border border-gray-200 flex items-center gap-1 cursor-not-allowed"
                  disabled
                >
                  <Plus className="w-3 h-3" />
                  Add Label
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[300px] max-w-[400px] space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Position
            </h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="bg-gray-50 h-48 flex items-center justify-center text-gray-400">
                Map functionality coming soon
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Time</div>
                  <TimeAgo date={device.lastReportTime} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Position Type</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    GPS ~20m accuracy
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    54.03966, -2.79505
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Greaves Park, Lancaster, LA1 4TZ
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[300px] max-w-[400px] space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Sensor Data
            </h2>
            <div className="bg-white rounded-lg border p-4 space-y-4">
              <div>
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-gray-400" />
                    6°C
                  </div>
                  <TimeAgo date={device.lastReportTime} />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Light Level</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-gray-400" />
                    1
                  </div>
                  <TimeAgo date={device.lastReportTime} />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-gray-400" />
                    50%
                  </div>
                  <TimeAgo date={device.lastReportTime} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
