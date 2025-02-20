import Image from 'next/image';
import CheckedIcon from '/public/checkbox.svg';
import CheckboxIcon from '/public/square-small.svg';
import { Checkbox } from "@radix-ui/react-checkbox";

interface Props {
    toppings: Record<string, string>;
    toppingsToAdd: Record<string, boolean>;
    toggleTopping: (toppingId: string) => void;
}

const ToppingsList = ({
    toppings,
    toppingsToAdd,
    toggleTopping,
}: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {toppings && Object.keys(toppings).map((toppingId) => (
                <label key={toppingId} id={`toppings_${toppings[toppingId]}`}>
                    <Checkbox
                        checked={true}
                        onCheckedChange={() => { toggleTopping(toppingId); }}
                        id={`checkbox-for-${toppings[toppingId]}`}
                    />
                    <span className="flex flex-row items-center space-x-4">{toppingsToAdd[toppingId] ?
                        <Image src={CheckedIcon} alt='checked' width={32} height={32} /> :
                        <Image src={CheckboxIcon} alt='unchecked' width={32} height={32} />}
                        <div className='align-left'>
                            {toppings[toppingId]}
                        </div>
                    </span>
                </label>
            ))}
        </div>
    );
};

export default ToppingsList;