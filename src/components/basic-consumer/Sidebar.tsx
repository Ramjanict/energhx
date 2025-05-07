import {
  ChevronDown,
  BarChart2,
  Building2,
  FileText,
  Wind,
  Settings,
  MessageSquare,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className=" "></div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 py-2">
          <div className="text-gray-500 font-medium">Dashboard</div>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-3 text-gray-500" />
              <span>Buildings</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="pl-12 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer">
            Overview
          </div>
          <div className="pl-12 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer">
            Add new building
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-3 text-gray-500" />
              <span>Energy Analysis</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="pl-12 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer">
            Audit
          </div>
          <div className="pl-12 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer">
            Report
          </div>
          <div className="pl-12 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer">
            Indoor Air Quality
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-3 text-gray-500" />
              <span>Support</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="px-4 py-2 mt-4">
          <div className="text-gray-500 font-medium">Reports</div>
        </div>

        <div className="mt-2">
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <FileText className="h-5 w-5 mr-3 text-gray-500" />
            <span>Audit Report</span>
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Wind className="h-5 w-5 mr-3 text-gray-500" />
            <span>Renewable Sizing</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Settings className="h-5 w-5 mr-3 text-gray-500" />
            <span>Settings</span>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 text-green-800 flex items-center justify-center rounded-md mr-2">
            EO
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium truncate">
              Emmanuel O.B. Og...
            </div>
            <div className="text-xs text-gray-500 truncate">
              info@energhx.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
