import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { mainnet, optimism, optimismSepolia, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, optimismSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [optimismSepolia.id]: http(),
  },
});
