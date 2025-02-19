'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Page() {
    const [toppings, setToppings] = useState<any[] | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('toppings').select();
            console.log("Data", { data });
            setToppings(data);
        };
        getData();
    }, []);

    return <pre>{JSON.stringify(toppings, null, 2)}</pre>;
}