export const web3LibSchema = {
  wagmi: {
    name: 'wagmi',
    imports: `import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
  import { publicProvider } from 'wagmi/providers/public';
    `,
    config: `const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
  });`,
    provider: [`<WagmiConfig client={client}>`, `</WagmiConfig>`],
  },
  useDapp: {
    name: 'useDapp',
    imports: `import { Mainnet, DAppProvider, Config } from '@usedapp/core';
  import { getDefaultProvider } from 'ethers';`,
    config: `const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
    },
    autoConnect: true,
  };`,
    provider: [`<DAppProvider config={config}>`, `</DAppProvider>`],
  },
  'web3-react': {
    name: 'web3-react',
    imports: `import { ethers } from 'ethers';
  import { Web3ReactProvider } from '@web3-react/core';`,
    config: `const getLibrary = (provider: any) => {
      const library = new ethers.providers.Web3Provider(provider);
      library.pollingInterval = 8000; // frequency provider is polling
      return library;
    };`,
    provider: [
      `<Web3ReactProvider getLibrary={getLibrary}>`,
      `</Web3ReactProvider>`,
    ],
  },
};
