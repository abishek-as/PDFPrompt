"use client";

import { trpc } from "@/app/_trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";

const Providers = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcCLient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
        })
    );
    return (
        <trpc.Provider client={trpcCLient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default Providers;
