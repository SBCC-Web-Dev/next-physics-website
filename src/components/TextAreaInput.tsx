interface TextInputProps {
    id: string;
    name: string;
    value: string;
    placeholder: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}

const TextAreaInput: React.FC<TextInputProps> = ({
    id,
    name,
    value,
    placeholder,
    label,
    onChange,
    rows = 3
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[textarea:focus-within]:outline has-[textarea:focus-within]:outline-2 has-[textarea:focus-within]:-outline-offset-2 has-[textarea:focus-within]:outline-indigo-600">
                    <textarea
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        rows={rows}
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 resize-none text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default TextAreaInput;
