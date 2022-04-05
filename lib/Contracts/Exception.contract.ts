export interface ExceptionContract extends Error {
    message: string;
    name: string;
    error: Error;
}