import { ProviderConfig } from '../types/api';

export const providerConfigs: ProviderConfig[] = [
  {
    name: 'Guardian',
    baseUrl: 'https://content.guardianapis.com',
    apiKey: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || '58e2b0e9-be14-4221-bf11-4fb6a43301e5',
    enabled: true, // Enable Guardian since we have the key
    priority: 1, // Equal priority with NYT
    rateLimit: {
      requestsPerMinute: 60,
      requestsPerHour: 500
    }
  },
  {
    name: 'NYT',
    baseUrl: 'https://api.nytimes.com/svc/news/v3',
    apiKey: process.env.NEXT_PUBLIC_NYT_API_KEY || 'ngOAPxKGGjwX7djxgNy3rnJb7PpHEYXH',
    enabled: true, // Enable NYT since we have the real key
    priority: 1, // Equal priority with Guardian
    rateLimit: {
      requestsPerMinute: 50,
      requestsPerHour: 400
    }
  }
];

// Environment variables needed:
// NEXT_PUBLIC_GUARDIAN_API_KEY=58e2b0e9-be14-4221-bf11-4fb6a43301e5 (working)
// NEXT_PUBLIC_NYT_API_KEY=ngOAPxKGGjwX7djxgNy3rnJb7PpHEYXH (working)

export const getProviderConfig = (name: string): ProviderConfig | undefined => {
  return providerConfigs.find(config => config.name.toLowerCase() === name.toLowerCase());
};

export const isProviderEnabled = (name: string): boolean => {
  const config = getProviderConfig(name);
  return config?.enabled || false;
};

export const getEnabledProviders = (): ProviderConfig[] => {
  return providerConfigs.filter(config => config.enabled);
};

// Helper function to check if any providers are enabled
export const hasEnabledProviders = (): boolean => {
  return getEnabledProviders().length > 0;
};

export const debugProviderStatus = () => {
  console.log('Provider Configs:', providerConfigs);
  console.log('Enabled Providers:', getEnabledProviders());
  console.log('Guardian API Key:', providerConfigs[0]?.apiKey);
  console.log('NYT API Key:', providerConfigs[1]?.apiKey);
  console.log('Guardian Enabled:', providerConfigs[0]?.enabled);
  console.log('NYT Enabled:', providerConfigs[1]?.enabled);
}; 