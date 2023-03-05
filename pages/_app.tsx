import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout2 from "../components/Layout/Layout2";
import { AppContextProvider } from "../utils/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
    </AppContextProvider>
  );
}
export default MyApp;
