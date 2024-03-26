export const LogoList = (symbol) => `https://api.iex.cloud/v1/stock/${symbol}/logo/`;

export const SymbolList = () => 'https://api.iex.cloud/v1/data/core/REF_DATA/';

export const StockData = (symbol) => `https://api.iex.cloud/v1/data/core/quote/${symbol}/`;

export const RegionSymbols = (region) => `https://api.iex.cloud/v1/ref-data/region/${region}/symbols/`;

export const CompanyInfo = (symbol) => `https://api.iex.cloud/v1/data/core/company/${symbol}/`;

export const HistoricalChart = (symbol) => `https://api.iex.cloud/v1/data/core/historical_prices/${symbol}/`;