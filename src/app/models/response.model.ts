export interface Response<T> {
    data: T,
    message: string
}

export interface Responses<T> {
    data: T[],
    message: string,
}

export interface Page<T> {
    data: T[],
    current_page: number,
    from: number,
    to: number,
    last_page: number,
    per_page: number,
    total: number
}