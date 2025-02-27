"use client"

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export function Providers({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [queryClient] = useState(() => new QueryClient());
    return <>
        <HeroUIProvider navigate={router.push}>
            <QueryClientProvider client={queryClient}>
                <ToastProvider
                    placement='top-center'
                />
                {children}
            </QueryClientProvider>
        </HeroUIProvider>

    </>


}