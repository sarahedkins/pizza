import Image from 'next/image';
import Trash from '/public/trash.svg';
import Pencil from '/public/pencil.svg';

interface Props {
    id: number;
    name: string;
    toppings: number[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    toppingsData: Record<string, string>;
    expired: boolean;
}

const PizzaCard = ({
    id,
    name,
    toppings,
    handleDelete,
    handleEdit,
    toppingsData,
    expired,
}: Props) => {
    return (
        <div key={id} className={expired ? "bg-red-100 rounded-lg shadow-md p-4 min-w-[250px] flex flex-col h-full" :
            "bg-white rounded-lg shadow-md p-4 min-w-[250px] flex flex-col h-full"
        }
        >
            <div className="flex-grow">
                <div className="flex flex-col">
                    <span className="text-gray-600">name</span>
                    <span className="text-black font-medium">{name}</span>
                    <br />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-600">toppings</span>
                    <span className="text-black font-medium">{toppings.map(toppingId => (
                        <div key={toppingId}>{toppingsData[`${toppingId}`]}</div>
                    ))}</span>
                </div>
            </div>
            <br />
            <div className="flex justify-between items-center text-black mt-4">
                <button onClick={() => handleDelete(id)} title="Delete topping.">
                    <Image src={Trash} alt='delete' width={18} height={18} />
                </button>
                <button onClick={() => handleEdit(id)} title="Edit topping.">
                    <Image src={Pencil} alt='edit' width={18} height={18} />
                </button>
            </div>
        </div>

    );
};

export default PizzaCard;

