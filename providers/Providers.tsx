"use client"

import { HeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export function Providers({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [queryClient] = useState(() => new QueryClient());
    return <>
        <HeroUIProvider navigate={router.push}>
            <QueryClientProvider client={queryClient}>
                <Toaster
                    duration={1000}
                    position='top-center'
                    theme={"dark"}
                    expand={false}
                />
                {children}
            </QueryClientProvider>
        </HeroUIProvider>

    </>


}