import { useEffect, useState } from "react";
import Input from "../Input";
import styles from './select.module.css';
import { CSSProperties } from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";
import useDebounce from "../../hooks/useDebounce";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
    options?: IOption[] | any
    onChange: any
    handleGetData?: Function
    isSearch?: boolean
    icon: string
    value?: string
    placeholder?: string
    optionSelect?: boolean
    name: string
    position?: string
    isIcon: boolean
    withLabel?: boolean
    error: any
    label: string
    defaultValue?: any
    motivoForm?: any
    reload?: any
    disabled?: boolean
    id?: string
}

interface IOption {
    id: number
    value: string
}

const Select = ({
    options,
    onChange,
    handleGetData,
    isSearch,
    icon,
    isIcon,
    error,
    name,
    value,
    label,
    defaultValue,
    disabled,
    id
}: IProps) => {


    const [_valueOptions, setValueOptions] = useState<string>(defaultValue);
    const [optionSearch, setOptionsSearch] = useState<any>([]);
    const [isOpen, setIsOpen, ref] = useOutsideClick(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, _setSearch] = useState("");
    const [_searching,] = useState(isSearch);

    const [querySearch, _setQuerySeach] = useState<string>("");
    const debounceSearch = useDebounce(querySearch, 350);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

    const setValueOption = (item: IOption, name: any, id: any) => {
        const div: any = ref.current;
        const inputHtml: any = div.querySelector('input');

        if (search) {
            // @ts-ignore (us this comment if typescript raises an error)
            ref.current.firstChild.firstChild.value = "";
            setValueOptions(item.value);
            inputHtml.value = "";
            onChange(item.id, item.value, name, id);
        } else {
            // @ts-ignore (us this comment if typescript raises an error)
            ref.current.firstChild.firstChild.value = "";
            setValueOptions(item.value);
            inputHtml.value = "";
            onChange(item.id, item.value, name, id);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (debounceSearch.length <= 2) {
            return;
        }
        if (handleGetData) {
            setIsLoading(true);
            handleGetData(debounceSearch, () => setIsLoading(false));
        }
    }, [debounceSearch]);

    useEffect(() => {
        if (options?.length > 0) {
            const results = options?.map((item: any) => ({
                id: item?.id?.toString(),
                value: item?.value
            }));
            setOptionsSearch(results);
        } else {
            setOptionsSearch([]);
        }
    }, [options]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedOptionIndex(prevIndex => Math.min(prevIndex + 1, resultsOptions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedOptionIndex(prevIndex => Math.max(prevIndex - 1, -1));
        } else if (e.key === "Enter" && selectedOptionIndex >= 0) {
            e.preventDefault();
            setValueOption(resultsOptions[selectedOptionIndex], name, id);
        }
    };

    const resultsOptions: any = !search ? optionSearch : optionSearch?.filter((option: any) => (typeof option.id === "string" || typeof option.value === "string") && option?.id?.toLowerCase().includes(search.toLocaleLowerCase()) || option?.value?.toLowerCase().includes(search.toLocaleLowerCase()));

    const optionsHeigth: CSSProperties = {
        height: resultsOptions && resultsOptions.length > 10 ? "215px" : "auto",
        filter: "blur(-1px)"
    };

    return (

        <>
            <div
                ref={ref} className={styles.wrapper__select}>
                <div className={disabled ? `${styles.input__select} ${styles.disabled__select}` : `${styles.input__select}`} onClick={() => setIsOpen(!isOpen)}>
                    {/* <div className={styles.selected__value}>
                        {valueOptions && <span>{valueOptions}</span>}
                    </div> */}
                    <div id={id}>
                        <Input onKeyDown={handleKeyDown} error={error}  name={name} value={value} label={label} onChange={onChange} type="text" isIcon={isIcon} icon={icon}
                        />
                    </div>
                    {
                        isLoading ?
                            <div className={styles.select__loader__container}>
                                <span className={styles.select__loader__icon}></span>
                            </div>
                            :
                            <div className="absolute z-10 right-5 top-5">
                                <Icon icon="ep:arrow-down-bold" onClick={() => setIsOpen(!isOpen)} />
                            </div>
                    }

                </div>

                {isOpen && (
                    <motion.div
                        style={optionsHeigth} className={styles.content__listOptions}>
                        {
                            resultsOptions && resultsOptions?.length > 0 ? resultsOptions?.map((item: IOption, index: number) => (
                                <motion.div>
                                    <li
                                        key={index}
                                        className={index === selectedOptionIndex ? `${styles.selected} ? ${styles.selectedOption}` : ''}
                                    >
                                        <p onClick={() => {
                                            setValueOption(item, name, id);
                                        }} >{item.value}</p>
                                    </li>
                                </motion.div>
                            )) :

                                <div className={styles.content__noResults__Select}>
                                    <p>No se encontraron más resultados</p>
                                </div>
                        }
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Select;