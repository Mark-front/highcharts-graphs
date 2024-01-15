import {memo, useEffect, useState} from 'react';
import cls from './Table.module.scss';
import {classNames} from "../../../../libs/classNames/classNames";
import {Layer} from "../Layer/Layer";
import {DataTable} from "../../types/types";


interface ITableProps {
    className?: string;
    data: DataTable
}

export const Table = memo((props: ITableProps) => {
    const {
        className = '',
        data
    } = props;
    const [rowsHeight, setRowsHeight] = useState('1fr')
    
    const heights: number[] = []
    
    const layers = data.Layer.map(
        ({layer_height, layer_name}, index) => {
            heights.push(layer_height)
            return (
                <Layer
                    key={index}
                    layer_name={layer_name}
                    layer_height={layer_height}
                    dataTable={data}
                />
            )
        })
    
    useEffect(() => {
        setRowsHeight(heights.map(item => `${item}fr`).join(' '))
    }, [heights])
    
    return (
        <div className={classNames(cls.Table, {}, [className])} style={{gridTemplateRows: rowsHeight}}>
            {layers}
        </div>
    );
})

Table.displayName = 'Table'