export interface IParams {
    api_key: string
}
export interface IMovieDetailsParams {
    id: number,
}


export const IMG_PREFIX: string = 'https://image.tmdb.org/t/p/w500';
export const API_KEY = '4f298a53e552283bee957836a529baec';

export interface IReturn<T> {
    Data: any | T;
    Message: string;
    Success: boolean;
    Authorized: boolean;
}