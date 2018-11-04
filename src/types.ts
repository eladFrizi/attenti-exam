

export interface ClassList<T>{
    [key: string] : SingleClass<T>
}

export interface SingleClass<T> {
    [key:string]:T
}

export interface fieldValidationDict {
    [index: string]: fieldValidtion
}

export interface fieldValidtion {
        func: Function,
        desc: string
}
