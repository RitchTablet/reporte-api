export interface ApiResponse<T> {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: T;
    message: string;
    error: boolean;
    statusCode:number;
}