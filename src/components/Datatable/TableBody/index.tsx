import { FC } from 'react';
import { ITableBodyProps } from '../types';
import styles from './../table.module.css';

const TableBody: FC<ITableBodyProps> = ({ data, colorRow, colorFont, actions }) => {

    console.log(data);

    return (
        <tbody>
            {data.map((row) => (
                <tr key={row._id} style={{ backgroundColor: colorRow }}>
                    {Object.entries(row).map(([key, cell], cellIndex) => (

                        key !== '_id' && key !== "category" && key !== "details" && key !== "description" && key !== 'escaneado' && key !== 'impreso' && key !== 'reproceso' && key !== 'flagPerfil' && key !== 'foto' &&
                        <td key={cellIndex} style={{ color: colorFont }}>
                            {key === 'isActiveInClub' ? ( // Verifica si es la propiedad `isActiveInClub`
                                <div className={cell === true ? styles.activeOrder : styles.inactiveOrder}>
                                    {cell === true ? 'ACTIVO' : 'INACTIVO'}
                                </div>
                            ) : (
                                key === 'activo' || key === 'validado' ? (
                                    <div className={cell === true ? styles.activeOrder : styles.inactiveOrder}>
                                        {key === 'activo' ? (cell === true ? 'ACTIVO' : 'INACTIVO') : (cell === true ? 'COMPLETADO' : 'PENDIENTE')}
                                    </div>
                                ) : (
                                    cell as React.ReactNode
                                )
                            )}
                        </td>
                    ))}
                    {
                        actions && actions.length > 0 && (
                            <td className={styles.tableActions}>
                                {actions && actions.map((action : any, actionIndex) => (
                                    <div key={actionIndex} className={styles.tooltipContainer}>
                                        {['edit', 'delete'].includes(action.className) && (
                                            <button
                                                className={styles[`${action.className}`]}
                                                onClick={() => action.onClick(row)}
                                            >
                                                {action.icon}
                                            </button>
                                        )}
                                        {/* Mostrar botón de entrada solo si el cliente está inactivo */}
                                        {action.className === 'entry' && row.isActiveInClub === false && (
                                            <button
                                                className={styles[`${action.className}`]}
                                                onClick={() => action.onClick(row)}
                                            >
                                                {action.icon}
                                            </button>
                                        )}
                                        {/* Mostrar botón de salida solo si el cliente está activo */}
                                        {action.className === 'exit' && row.isActiveInClub === true && (
                                            <button
                                                className={styles[`${action.className}`]}
                                                onClick={() => action.onClick(row)}
                                            >
                                                {action.icon}
                                            </button>
                                        )}
                                        <p className={styles.tooltip}>{action.tooltip}</p>
                                    </div>
                                ))}
                            </td>
                        )
                    }
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;


