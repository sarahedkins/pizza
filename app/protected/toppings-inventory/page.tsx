'use client';

import Loader from '@/components/pizza/loader/loader';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Add from '/public/add.svg';
import CircleXMark from '/public/circle-xmark.svg';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';

export default function ToppingsInventoryPage() {
    const [toppings, setToppings] = useState<any[] | null>(null);
    const [showAddNew, setShowAddNew] = useState<boolean>(false);
    const [refetchToppings, setRefetchToppings] = useState<number>(0);
    const [addNewError, setAddNewError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('toppings').select();

            // const data = [
            //     {
            //         "id": 1,
            //         "created_at": "2025-02-18T23:13:08.797704+00:00",
            //         "name": "pepperoni",
            //         "quantity": 250
            //     },
            //     {
            //         "id": 2,
            //         "created_at": "2025-02-18T23:13:23.474823+00:00",
            //         "name": "sausage",
            //         "quantity": 150
            //     },
            //     {
            //         "id": 3,
            //         "created_at": "2025-02-18T23:13:37.781789+00:00",
            //         "name": "basil",
            //         "quantity": 300
            //     },
            //     {
            //         "id": 4,
            //         "created_at": "2025-02-18T23:13:56.859458+00:00",
            //         "name": "mushroom",
            //         "quantity": 100
            //     }
            // ];
            setToppings(data);
        };
        getData();
    }, [refetchToppings]);

    if (!toppings) {
        return (
            <Loader />
        );
    }

    const toggleAddNew = () => {
        setShowAddNew(!showAddNew);
    };

    const closeAddNew = () => {
        setShowAddNew(false);
    };

    const handleAddNewTopping = (formData: any) => {
        addNewToppingAction(formData);
        setRefetchToppings(refetchToppings + 1);
    };

    const addNewToppingAction = async (formData: FormData) => {
        const supabase = await createClient();

        const name = formData.get("name") as string;

        if (!name) {
            setAddNewError("Topping name is required");
            return;
        }

        const { error } = await supabase
            .from('toppings')
            .insert({ name: name });

        if (error) {
            setAddNewError(`Adding topping has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }

        closeAddNew();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Available Pizza Toppings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {toppings.map((topping) => (
                    <div key={topping.id} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-gray-600">name</span>
                                <span className="text-black font-medium">{topping.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600">quantity</span>
                                <span className="text-black font-medium text-right">{topping.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={toggleAddNew} title="Open add new topping form.">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-center">
                            <span className="text-black font-medium">
                                <Image src={Add} alt='add' width={50} height={50} />
                            </span>
                        </div>
                    </div>
                </button>
            </div>

            <br />
            {
                showAddNew &&
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-end">
                        <button onClick={closeAddNew} title="Close new topping form.">
                            <Image src={CircleXMark} alt='add' width={32} height={32} />
                        </button>
                    </div>
                    <div>
                        <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
                            <div>
                                <h1 className="text-2xl font-medium text-black">Add Topping</h1>
                            </div>
                            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 text-black">
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" placeholder="pepperoni" className="text-white" required onChange={() => setAddNewError(null)} />
                                <SubmitButton formAction={handleAddNewTopping} className="bg-black text-white hover:bg-orange-400">
                                    Create New Topping
                                </SubmitButton>
                                {addNewError && (
                                    <div className='p-2 rounded-md bg-red-100'>
                                        {addNewError}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            }

        </div>
    );
}