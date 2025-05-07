"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

// Define the types for our props
interface EnergyCardProps {
  title: string;
  icon: LucideIcon;
  shortDescription: string;
  overviewContent: string;
  prosContent: string[];
  consContent: string[];
  actionText: string;
  onActionClick: () => void;
}

// Define the tab types
type TabType = "overview" | "pros" | "cons";

export default function EnergyCard({
  title,
  icon: Icon,
  shortDescription,
  overviewContent,
  prosContent,
  consContent,
  actionText,
  onActionClick,
}: EnergyCardProps) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0_0_1px_2px_rgba(0,0,0,.04)]">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-700 mb-4">{shortDescription}</p>

      <div className="flex gap-2 mb-4">
        <Button
          variant="ghost"
          className={`rounded-full px-4 py-1 h-8 ${
            activeTab === "overview"
              ? "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant="ghost"
          className={`rounded-full px-4 py-1 h-8 ${
            activeTab === "pros"
              ? "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("pros")}
        >
          Pros
        </Button>
        <Button
          variant="ghost"
          className={`rounded-full px-4 py-1 h-8 ${
            activeTab === "cons"
              ? "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("cons")}
        >
          Cons
        </Button>
      </div>

      <div className="text-gray-700 mb-6 min-h-[120px]">
        {activeTab === "overview" && <p>{overviewContent}</p>}

        {activeTab === "pros" && (
          <ul className="list-disc pl-5 space-y-1">
            {prosContent.map((pro, index) => (
              <li key={index}>{pro}</li>
            ))}
          </ul>
        )}

        {activeTab === "cons" && (
          <ul className="list-disc pl-5 space-y-1">
            {consContent.map((con, index) => (
              <li key={index}>{con}</li>
            ))}
          </ul>
        )}
      </div>

      <Button
        className="bg-green-600 hover:bg-green-700 text-white w-full justify-between"
        onClick={onActionClick}
      >
        {actionText}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
