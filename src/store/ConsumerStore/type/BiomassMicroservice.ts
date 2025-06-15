type BioRanges = {
  CO2: number[];
  E: number[];
  H2: number[];
  NH3: number[];
  SADout: number[];
  SHTC: number[];
  VADCH4: number[];
  XADout: number[];
  ZADCH4: number[];
  t_values: number[];
};

type BioResults = {
  CO2: number;
  E: number;
  H2: number;
  MCO2: number;
  MH2: number;
  MNH3: number;
  MSADout: number;
  MXADout: number;
  MZADCH4: number;
  NH3: number;
  SADout: number;
  SHTCout: number;
  XADout: number;
  ZADCH4: number;
};

export type BiomassMicroservice = {
  ranges: BioRanges[];
  results: BioResults[];
};
