// Energy Audit Data Types
type CoolingLoadProfile = Record<string, number>;

type EVBatterySizing = {
  "battery-classification": string;
  "cell-energy": number;
  "cell-volume": number;
  "cells-in-series": number;
  "energy-content-of-string": number;
  "gravitational-energy-density": number;
  manufacturer: string;
  model: string;
  "number-of-cells": number;
  "number-of-strings-in-pack": number;
  "pack-continuos-power": number;
  "pack-peak-current": number;
  "package-continous": number;
  "package-peak-power": number;
  "package-total-capacity": number;
  "package-total-energy": number;
  "package-total-mass": number;
  "package-total-volume": number;
  "string-continou-current": number;
  "string-peak-current": number;
  title: string;
  "volumetric-density": number;
};

type Room = {
  id: string;
  title: string;
  "cooling load": {
    "total cooling load profile": CoolingLoadProfile;
  };
  "energy audit": {
    "EUI total": number;
    IAC: number;
    IACD: number;
    SHGCB: number;
    SHGCD: number;
    "U-value of fenestration": number;
    "U-value of roof": number;
    "U-value of wall": number;
    "air-conditioning power density": number;
    "equipment power density": number;
    "fenestration-to-wall ratio": number;
    "floor area": number;
    "infiltration rate": number;
    "lighting power density": number;
    "occupant density": number;
    "outdoor air temperature": number;
    "outdoor humidity ratio": number;
    "space air temperature": number;
    "space humidity ratio": number;
  };
};

type OptimalParameters = {
  IAC: number;
  IACD: number;
  SHGCB: number;
  SHGCD: number;
  "U-value-of-fenestration": number;
  "U-value-of-roof": number;
  "U-value-of-wall": number;
  "equipment-power-density": number;
  "fenestration-to-wall-ratio": number;
  "infiltration-rate": number;
  "lighting-power-density": number;
  "occupant-density": number;
  "outdoor-air-temperature": number;
  "outdoor-humidity-ratio": number;
  "space-air-temperature": number;
  "space-humidity-ratio": number;
};

type EnergyAuditCharacterizationOptimization = {
  "Objective-Function-Value-(EUI)": number;
  "Optimal-Parameters": OptimalParameters;
  rooms: Room[];
};

type EnergyFullData = {
  title: string;
  idx: string;
  "Cooling Load Calculation": CoolingLoadProfile;
  "EV-Battery Sizing": EVBatterySizing[];
  "Energy Audit, Characterization, Optimization": EnergyAuditCharacterizationOptimization;
};

// Define the array of buildings data
export type EneryAuditArrayData = EnergyFullData[];
