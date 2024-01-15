export interface LayerProperties {
    layer_name: string
    layer_height: number
}

export interface GroupProperties {
    layer_name: string
    group_name: string
    group_height: number
    group_width: number
    
}
export interface BrickProperties {
    brick_width: number;
    brick_short_name: string
    layer_name: string
    group_name: string
    brick_color: string
    brick_tags: string
    line_in_group: number
    
}
export interface DataTable {
    Layer: LayerProperties[]
    Group: GroupProperties[]
    Brick: BrickProperties[]
}