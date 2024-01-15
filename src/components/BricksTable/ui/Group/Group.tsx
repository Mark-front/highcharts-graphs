import {memo, useEffect, useState} from 'react';
import cls from './Group.module.scss';
import {classNames} from "../../../../libs/classNames/classNames";
import {DataTable} from "../../types/types";
import {Brick} from "../Brick/Brick";

interface IGroupProps {
    className?: string
    layerName: string
    groupName: string
    groupHeight: number
    dataTable: DataTable
    groupSize: number
}

function chunkArray(array, chunk) {
    const newArray = [];
    for (let i = 0; i < array.length; i += chunk +1) {
        newArray.push(array.slice(i, i + chunk +1));
    }
    return newArray;
}

export const Group = memo((props: IGroupProps) => {
    const {
        className = '',
        layerName = '',
        groupName = '',
        groupHeight = 1,
        groupSize,
        dataTable,
    } = props;
    
    const gridColumns = () => {
        const columnsArr = []
    
        dataTable.Brick.forEach(item => {
            if (item.layer_name === layerName && item.group_name === groupName) {
                columnsArr.push(item.brick_width + 'fr')
            }
        })
        return chunkArray(columnsArr, columnsArr.length / groupHeight)
    }
    
    const getBricks = () => {
    
        const bricksArr = []
        dataTable.Brick.forEach(item => {
            
            if (item.layer_name === layerName && item.group_name === groupName) {
                bricksArr.push(item)
            }
        })
        return chunkArray(bricksArr, bricksArr.length / groupHeight)
    
    }
    
    
    const lines = gridColumns()
    const bricks = getBricks()
    
    const [isEmptyGroupBrick, setEmptyGroupBrick] = useState(false)
    
    
    useEffect(() => {
        if (bricks[0].length === 1 && bricks[0][0].group_name === 'empty_group') {
            setEmptyGroupBrick(true)
        }
    }, [bricks])
    
    return (
        <div className={classNames(cls.Group, {[cls.isEmptyGroupBrick]: isEmptyGroupBrick}, [className])}>
            {groupName !== 'empty_group' && <div className={cls.name}> {groupName} </div>}
            {
                lines.map((column, indexT) => (
                    !!bricks[indexT].length && (<div key={indexT} className={cls.content} style={{flexDirection: (bricks[indexT].length <= 2 && lines.length <= 1 ) ?  'column' : 'row'}}>
                        {bricks[indexT].map((item, index) => {
                                return <Brick
                                    key={item.brick_short_name + index}
                                    className={cls.brick}
                                    brickShortName={item.brick_short_name}
                                    layerName={item.layer_name}
                                    groupName={item.group_name}
                                    brickColor={item.brick_color}
                                    brickTags={item.brick_tags}
                                    lineInGroup={item.line_in_group}
                                />
                        })}
                    </div>)
                ))
            }
        </div>
    );
})

Group.displayName = 'Group'