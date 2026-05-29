import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.powerguard.app',
  appName: 'powerguard',
  webDir: 'dist/client',
  server: {
    androidScheme: 'https',
    cleartext: true,
    url: 'http://192.168.8.104:8080'
  }
};

export default config;
