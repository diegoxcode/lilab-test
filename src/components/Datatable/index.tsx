import { FC, useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { IDataTableProps } from './types';
import styles from './table.module.css';
import notfound from './../../assets/svg/logoblack.svg';

const DataTable: FC<IDataTableProps> = ({ headerColumns, bodyData, color, idTable, colorFont, colorRow, actions }) => {
    const [data, setData] = useState(bodyData);

    useEffect(() => {
        setData(bodyData);
    }, [bodyData]);

    const handleSort = (column: string) => {
        const sortedData = [...data].sort((a, b) => (a[column] > b[column] ? 1 : -1));
        setData(sortedData);
    };

    return (
        <div className='w-full'>
            {
                data?.length > 0 ?
                    <table className={styles.table} id={idTable} style={{ backgroundColor: color }}>
                        <TableHeader columns={headerColumns} colorFont={colorFont} onSort={handleSort} actions={actions} />
                        <TableBody data={data} colorRow={colorRow} colorFont={colorFont} actions={actions} />
                    </table>
                    : <div className={styles.not__data}>
                        <div className='text-center mx-auto mt-48'>
                            <img className='text-center mx-auto' src={notfound} alt="" />
                            <div>
                                <p>Al parecer no hemos encontrado un registro de dicha busqueda, intentelo nuevamente o agregue un nuevo registro para visualizar sus datos</p>
                            </div>
                        </div>

                    </div>
            }
        </div>
    );
};

export default DataTable;



