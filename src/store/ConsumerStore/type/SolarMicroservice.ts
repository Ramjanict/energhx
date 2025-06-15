type SolarPlot = {
  absorbance_vs_transmittance_plot: string;
  delta_dye_plot: string;
  delta_fto_plot: string;
  delta_photoanode_plot: string;
  delta_substrate_plot: string;
  number_of_cells_vs_energy_yield_plot: string;
  number_of_cells_vs_total_plug_load_plot: string;
  reflectance_vs_transmittance_plot: string;
};
export type SolarMicroservice = {
  efficiency: number;
  energy_output: number;
  num_cells: number;
  plots: SolarPlot;
};
