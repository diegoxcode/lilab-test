export interface ITableHeaderProps {
    columns: string[];
    colorFont?: string;
    actions?: IAction[];
    onSort: (column: string) => void;
}

export interface ITableBodyProps {
    data: any[];
    colorRow?: string;
    colorFont?: string;
    actions?: IAction[]; 
}

export interface IDataTableProps {
    headerColumns: string[];
    bodyData: any[];
    color?: string;
    idTable?: string;
    colorFont?: string;
    colorRow?: string;
    actions?: IAction[]; 
}

export interface IAction {
    onClick: (row: any) => void;
    className?: string;
    icon?: any
    tooltip?: string
};
