import {memo} from 'react';
import cls from './Brick.module.scss';
import {classNames} from "../../../../libs/classNames/classNames";

interface IBrickProps {
    className?: string
    brickShortName: string
    layerName: string
    groupName: string
    brickColor: string
    brickTags: string
    lineInGroup: number
}

export const Brick = memo((props: IBrickProps) => {
    const {
        className = '',
        brickShortName = '',
        layerName = '',
        groupName = '',
        brickColor = '',
        brickTags = '',
        lineInGroup = '',
    } = props;

    const tags = brickTags.split(', ')
    
    const tagsAbstract = {
        'РР': {
            color: 'red',
            text: 'РР',
        },
        'М': {
            color: 'yellow',
            text: 'М',
        },
        'КРГ': {
            color: 'blue',
            text: 'КРГ',
        }
    }
    return (
        <div className={classNames(cls.Brick, {}, [className])} style={{border: `3px solid ${brickColor}`}}>
            {!!brickTags.length && <div className={cls.tags}>
                <div className={cls.tag} style={{color: tagsAbstract[tags[0]]?.color}}>{tagsAbstract[tags[0]]?.text}</div>
                <div className={cls.tag} style={{color: tagsAbstract[tags[1]]?.color}}>{tagsAbstract[tags[1]]?.text}</div>
                <div className={cls.tag} style={{color: tagsAbstract[tags[2]]?.color}}>{tagsAbstract[tags[2]]?.text}</div>
            </div>}
            {brickShortName}
        </div>
    );
})

Brick.displayName = 'Brick'