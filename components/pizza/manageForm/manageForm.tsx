import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import CircleXMark from '/public/circle-xmark.svg';
import { ReactNode } from 'react';

interface Props {
    headingText: string;
    close: () => void;
    submit: (formData: FormData) => Promise<void>;
    submitText?: string;
    errorText: string | null;
    children?: ReactNode;
}

const ManageForm = ({
    headingText,
    close,
    submit,
    submitText = 'Submit',
    errorText,
    children,
}: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-end">
                <button onClick={close} title="Close form.">
                    <Image src={CircleXMark} alt='close' width={32} height={32} />
                </button>
            </div>
            <div>
                <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
                    <div>
                        <h1 className="text-2xl font-medium text-black">{headingText}</h1>
                    </div>
                    <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 text-black">
                        {children}
                        <SubmitButton formAction={submit} className="bg-black text-white hover:bg-orange-400">
                            {submitText}
                        </SubmitButton>
                        {errorText && (
                            <div className='p-2 rounded-md bg-red-100'>
                                {errorText}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageForm;

