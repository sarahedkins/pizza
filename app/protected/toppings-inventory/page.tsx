'use client';

import Loader from '@/components/pizza/loader/loader';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Add from '/public/add.svg';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ManageForm from '@/components/pizza/manageForm/manageForm';
import ToppingCard from '@/components/pizza/toppingCard/toppingCard';
import Link from 'next/link';
import { scrollToElement } from '@/lib/utils';

const tableToppings = 'toppings';

export default function ToppingsInventoryPage() {
    const [toppings, setToppings] = useState<any[] | null>(null);
    const [addNew, setAddNew] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [refetchToppings, setRefetchToppings] = useState<number>(0);
    const [addNewError, setAddNewError] = useState<string | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [editToppingName, setEditToppingName] = useState<string>("");

    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from(tableToppings).select();
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
        if (!addNew) {
            setEditId(null); // only one ManageSection should show at a time
            scrollToElement('manage-section');
        }
        setAddNew(!addNew);
    };

    const closeAddNew = () => {
        setAddNew(false);
    };

    const addNewTopping = async (formData: FormData) => {
        const supabase = await createClient();
        const name = formData.get("name") as string;
        const { error } = await supabase
            .from(tableToppings)
            .insert({ name: name });

        if (error) {
            setAddNewError(`Adding topping has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }
        closeAddNew();
        setRefetchToppings(refetchToppings + 1);
    };

    const editTopping = async (formData: FormData) => {
        const supabase = await createClient();
        const name = formData.get("name") as string;

        const { error } = await supabase
            .from(tableToppings)
            .update({ name })
            .eq('id', editId);

        if (error) {
            setEditError(`Editing topping has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }
        setEditId(null);
        setRefetchToppings(refetchToppings + 1);
    };

    const deleteTopping = async (id: string) => {
        const supabase = await createClient();
        const response = await supabase
            .from(tableToppings)
            .delete()
            .eq('id', id);

        if (response.error) {
            const { error } = response;
            setAddNewError(`Deleting topping has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }
        setRefetchToppings(refetchToppings + 1);
    };

    const handleSetEditId = (id: number) => {
        if (addNew) {
            setAddNew(false);
        }
        const topping = toppings.find(topping => topping.id === id);
        setEditToppingName(topping?.name ?? "Pepperoni");
        setEditId(id);
        scrollToElement('manage-section');
    };

    return (
        <div className="container mx-auto p-4">
            <Link className="text-primary font-medium underline" href="/protected">
                Back
            </Link>
            <h2 className="text-2xl font-bold mb-4">Available Pizza Toppings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toppings.map((topping) => (
                    <ToppingCard
                        key={topping.id}
                        {...topping}
                        handleDelete={deleteTopping}
                        handleEdit={handleSetEditId}
                    />
                ))}
                <button onClick={toggleAddNew} title="Open add new topping form." className="h-full">
                    <div className="bg-white rounded-lg shadow-md p-4 h-full flex items-center justify-center">
                        <span className="text-black font-medium">
                            <Image src={Add} alt='add' width={50} height={50} />
                        </span>
                    </div>
                </button>
            </div>

            <br />
            <div id="manage-section">
                {/* This is a landmark for scrollToElement! */}
            </div>
            {
                addNew &&
                <ManageForm
                    headingText="Add New Topping"
                    close={closeAddNew}
                    submit={addNewTopping}
                    submitText="Create"
                    errorText={addNewError}
                >
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" placeholder="pepperoni" className="text-white" required onChange={() => setAddNewError(null)} />
                </ManageForm>
            }
            {editId &&
                <ManageForm
                    headingText="Edit Topping"
                    close={() => setEditId(null)}
                    submit={editTopping}
                    submitText="Update"
                    errorText={editError}
                >
                    <Label htmlFor="name">Rename?</Label>
                    <Input
                        name="name"
                        value={editToppingName}
                        className="text-white"
                        required
                        onChange={(e) => {
                            setEditToppingName(e.target.value);
                            setAddNewError(null);
                        }}
                    />
                </ManageForm>
            }
        </div>
    );
}