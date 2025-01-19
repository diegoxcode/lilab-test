import { FC } from 'react';
import { ITableHeaderProps } from '../types';

const TableHeader: FC<ITableHeaderProps> = ({ columns, colorFont, onSort,actions }) => {
    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th key={column} style={{ color: colorFont }} onClick={() => onSort(column)}>
                        {column}
                    </th>
                ))}
                {
                    actions && actions.length ? <th>Acciones</th> : '' 
                }
            </tr>
        </thead>
    );
};

export default TableHeader;