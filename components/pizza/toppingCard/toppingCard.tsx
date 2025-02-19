import Image from 'next/image';
import Trash from '/public/trash.svg';
import Pencil from '/public/pencil.svg';

interface Props {
    id: number;
    name: string;
    quantity: number;
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
}

const ToppingCard = ({
    id,
    name,
    quantity,
    handleDelete,
    handleEdit,
}: Props) => {
    return (
        <div key={id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-gray-600">name</span>
                        <span className="text-black font-medium">{name}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">quantity</span>
                        <span className="text-black font-medium text-right">{quantity}</span>
                    </div>
                </div>
                <br />
                <div className="flex justify-between items-center text-black">
                    <button onClick={() => handleDelete(id)} title="Delete topping.">
                        <Image src={Trash} alt='delete' width={18} height={18} />
                    </button>
                    <button onClick={() => handleEdit(id)} title="Edit topping.">
                        <Image src={Pencil} alt='edit' width={18} height={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToppingCard;

