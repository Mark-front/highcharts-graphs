import {memo, useEffect, useState} from 'react';
import cls from './Layer.module.scss';
import {classNames} from "../../../../libs/classNames/classNames";
import {DataTable, LayerProperties} from "../../types/types";
import {Group} from "../Group/Group";

interface LayerProps extends LayerProperties {
    className?: string;
    dataTable: DataTable
}

export const Layer = memo((props: LayerProps) => {
    const {
        className = '',
        layer_name = '',
        layer_height = 1,
        dataTable,
    } = props;
    
    const [gridColumns, setGridColumns] = useState('')
    
    useEffect(() => {
        // высчитывает ширину группы отностительно количества Bricks в большей линии
        const columns = dataTable.Group.map(group => {
            if (group.group_height === 1) return
            
            const arrGridPrecent = []
            dataTable.Brick.forEach(brick => {
                if (brick.layer_name === layer_name && brick.group_name === group.group_name) {
                    arrGridPrecent.push(brick)
                }
            })
            if (!arrGridPrecent.length || layer_height === 1) return
            return Math.max(arrGridPrecent.length / group.group_height, 1) + 'fr'
        }).join(' ')
        
        
        setGridColumns(columns)
    }, [dataTable])
    
    return (
        <div className={classNames(cls.Layer, {}, [className])} >
            <div className={cls.name}>
                {layer_name}
            </div>
            
            <div className={cls.content} style={{gridTemplateColumns: gridColumns}}>
                {dataTable.Group.map((group, index) => {
                    if (group.layer_name !== layer_name) return
                    return <Group
                        key={group.group_name + index}
                        groupHeight={group.group_height}
                        layerName={group.layer_name}
                        groupName={group.group_name}
                        groupSize={group.group_width}
                        dataTable={dataTable}
                    />
                })}
            </div>
        </div>
    );
})

Layer.displayName = 'Layer'