import Image from 'next/image';
import pizza from '/public/pizza.png';

const Loader = () => {
    return (
        <div className="animate-spin">
            <Image src={pizza} alt='pizza' width={50} height={50} />
        </div>
    );
};

export default Loader;