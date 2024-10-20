import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FC } from "react";
import StoreProvider from "./Redux/StoreProvider.tsx";

const Wrapper: FC = () => {
    return (
        <StoreProvider>
            <App />
        </StoreProvider>
    );
};

createRoot(document.getElementById("root")!).render(<Wrapper />);
