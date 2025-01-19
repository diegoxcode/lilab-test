import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
    label: string
    value?: string
    onChange: any
    max?: number | string
    isGroup?: boolean
    onKeyDown?: any
    type?: string
    name: string
    icon: string
    disabled?: boolean
    isIcon?: boolean
    error?: string
}

const Input = ({
    label,
    value,
    onChange,
    max,
    isGroup,
    type,
    onKeyDown,
    name,
    disabled,
    isIcon,
    icon,
    error
}: IProps) => {

    return (
        <div className="relative">
            <div className={`relative z-0 ${isGroup ? "" : "border-gray-200 border-solid border rounded-md"}`}>
                {
                    isIcon && (
                        <div className="absolute top-3.5 left-3">
                            <div>
                                <Icon icon={icon} width="24" height="24" />
                            </div>
                        </div>
                    )
                }
                <div className={`content-[""] w-[1px] h-full bg-[#e3e3e3] absolute left-12`}>

                </div>
                {
                    onKeyDown && (
                        <input
                            id={label}
                            name={name}
                            disabled={disabled}
                            type={type ? type : "text"}
                            placeholder=" "
                            className="peer font-bold block w-full pl-14 border-gray-400 py-5 pb-2 rounded-lg focus:outline-none focus:border-1 focus:ring-0 focus:border-[#222] focus:pl-14"
                            value={value}
                            onChange={onChange}
                            max={max}
                            onKeyDown={onKeyDown}
                        />
                    )
                }
                {
                    !onKeyDown && (
                        <input
                            id={label}
                            name={name}
                            disabled={disabled}
                            type={type ? type : "text"}
                            placeholder=" "
                            className="peer font-bold block w-full pl-14 border-gray-400 py-5 pb-2 rounded-lg focus:outline-none focus:border-1 focus:ring-0 focus:border-[#222] focus:pl-14"
                            defaultValue={value}
                            onChange={onChange}
                            max={max}
                            onKeyDown={onKeyDown}
                        />
                    )
                }

                <label
                    htmlFor={label}
                    className="absolute left-14 top-2 text-xs text-gray-600 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-xs peer-focus:text-black-500"
                >
                    {label}
                </label>

            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;