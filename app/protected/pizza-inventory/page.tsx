'use client';

import Loader from '@/components/pizza/loader/loader';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Add from '/public/add.svg';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ManageForm from '@/components/pizza/manageForm/manageForm';
import Link from 'next/link';
import PizzaCard from '@/components/pizza/pizzaCard/pizzaCard';
import { scrollToElement } from '@/lib/utils';
import ToppingsList from '@/components/pizza/toppingsList/toppingsList';

const tablePizzas = 'pizzas';
const tableToppings = 'toppings';

interface Pizza {
    id: number;
    name: string;
    toppings: number[];
    expiredToppings: boolean;
}

export default function PizzaInventoryPage() {
    const [pizzas, setPizzas] = useState<Pizza[] | null>(null);
    const [toppings, setToppings] = useState<Record<string, string> | null>(null);
    const [addNew, setAddNew] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
    const [refetchPizzas, setRefetchPizzas] = useState<number>(0);
    const [addNewError, setAddNewError] = useState<string | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [toppingsToAdd, setToppingsToAdd] = useState<Record<string, boolean>>({});
    const [editPizzaName, setEditPizzaName] = useState<string>("");

    const supabase = createClient();

    useEffect(() => {
        const getToppingsData = async () => {
            const { data } = await supabase.from(tableToppings).select();
            const result: Record<string, string> = {};
            data?.forEach(d => {
                result[`${d.id}`] = d.name;
            });
            setToppings(result);
        };
        getToppingsData();
    }, []);

    useEffect(() => {
        const getPizzaData = async () => {
            if (!toppings) return;
            const { data } = await supabase.from(tablePizzas).select();
            if (!data) return;

            const updatedData: Pizza[] = data.map(d => {
                let expiredToppings = false;
                for (let i = 0; i < d.toppings.length; i++) {
                    const top = toppings[`${d.toppings[i]}`];
                    if (!toppings[`${d.toppings[i]}`]) {
                        expiredToppings = true;
                        break;
                    }
                }
                return { ...d, expiredToppings };
            });
            setPizzas(updatedData);
        };
        if (toppings != null) {
            getPizzaData();
        }
    }, [refetchPizzas, toppings]);

    if (!toppings || !pizzas) {
        return (
            <Loader />
        );
    }

    const toggleAddNew = () => {
        if (!addNew) {
            setEditId(null); // only one ManageSection should show at a time
            setSelectedPizza(null);
            scrollToElement('manage-section');

            // clear existing toppingsToAdd
            setToppingsToAdd({});
        }
        setAddNew(!addNew);
    };

    const closeAddNew = () => {
        setAddNew(false);
    };

    const addNewPizza = async (formData: FormData) => {
        const supabase = await createClient();
        const name = formData.get("name") as string;
        const toppingIdsToAdd =
            Object.keys(toppingsToAdd).filter(toppingId => !!toppingsToAdd[toppingId]).map(toppingIdString => parseInt(toppingIdString));

        const { error } = await supabase
            .from(tablePizzas)
            .insert({ name: name, toppings: toppingIdsToAdd });

        if (error) {
            setAddNewError(`Adding pizza has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }
        closeAddNew();
        setRefetchPizzas(refetchPizzas + 1);
    };

    const editPizza = async (formData: FormData) => {
        const supabase = await createClient();
        const name = formData.get("name") as string;
        const toppingIdsToAdd =
            Object.keys(toppingsToAdd).filter(toppingId => !!toppingsToAdd[toppingId]).map(toppingIdString => parseInt(toppingIdString));

        const { error } = await supabase
            .from(tablePizzas)
            .update({ name, toppings: toppingIdsToAdd })
            .eq('id', editId);

        if (error) {
            setEditError(`Editing topping has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }
        setEditId(null);
        setSelectedPizza(null);
        setRefetchPizzas(refetchPizzas + 1);
    };

    const deletePizza = async (id: number) => {
        const supabase = await createClient();
        const response = await supabase
            .from(tablePizzas)
            .delete()
            .eq('id', id);

        if (response.error) {
            const { error } = response;
            setAddNewError(`Deleting topping has failed${error.message ? `: ${error.message}` : '.'}`);
            return;
        }
        setRefetchPizzas(refetchPizzas + 1);
    };

    const handleSetEditId = (id: number) => {
        if (addNew) {
            setAddNew(false);
        }
        setEditId(id);
        const pizza = pizzas.find(pizza => pizza.id === id);
        if (!pizza) return;
        setSelectedPizza(pizza);
        setEditPizzaName(pizza.name);
        const previousToppings: Record<string, boolean> = {};
        (pizza?.toppings ?? []).forEach(pizzaTopping => {
            if (toppings[pizzaTopping]) {
                previousToppings[pizzaTopping] = true;
            }
        });
        setToppingsToAdd(previousToppings);
        scrollToElement('manage-section');
    };

    const toggleTopping = (toppingId: string) => {
        setToppingsToAdd({ ...toppingsToAdd, [toppingId]: !toppingsToAdd[toppingId] });
    };

    return (
        <div className="container mx-auto p-4">
            <Link className="text-primary font-medium underline" href="/protected">
                Back
            </Link>
            <h2 className="text-2xl font-bold mb-4">Available Pizzas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pizzas.map((pizza) => (
                    <PizzaCard
                        key={pizza.id}
                        {...pizza}
                        handleDelete={deletePizza}
                        handleEdit={handleSetEditId}
                        toppingsData={toppings}
                        expired={pizza.expiredToppings}
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
            {
                addNew &&
                <ManageForm
                    headingText="Add New Pizza"
                    close={closeAddNew}
                    submit={addNewPizza}
                    submitText="Create"
                    errorText={addNewError}
                >
                    <Label htmlFor="name">What do you want to call it?</Label>
                    <Input name="name"
                        placeholder="Meat Lover's Pie"
                        className="text-white" required
                        onChange={() => setAddNewError(null)} />

                    <Label htmlFor="toppings[]">Choose toppings:</Label>
                    <ToppingsList
                        toppings={toppings}
                        toppingsToAdd={toppingsToAdd}
                        toggleTopping={toggleTopping}
                    />
                    <br />
                </ManageForm>
            }
            <div id="manage-section">
                {/* This is a landmark for scrollToElement! */}
            </div>
            {editId &&
                <ManageForm
                    headingText="Edit Pizza"
                    close={() => setEditId(null)}
                    submit={editPizza}
                    submitText="Update"
                    errorText={editError}
                >
                    <Label htmlFor="name">Rename it?</Label>
                    <Input
                        name="name"
                        value={editPizzaName}
                        className="text-white"
                        required
                        onChange={(e) => {
                            setEditPizzaName(e.target.value);
                            setAddNewError(null);
                        }}
                    />

                    <Label htmlFor="toppings[]">Edit toppings:</Label>
                    <ToppingsList
                        toppings={toppings}
                        toppingsToAdd={toppingsToAdd}
                        toggleTopping={toggleTopping}
                        expiredTopping={selectedPizza?.expiredToppings}
                    />
                </ManageForm>
            }
        </div>
    );
};