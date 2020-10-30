/// <reference types="react-scripts" />

interface RowData{
    data: Object<Points>,
    index: number,
    onChange: Function
}

interface Point{
    x:number|string,
    y:number
}
