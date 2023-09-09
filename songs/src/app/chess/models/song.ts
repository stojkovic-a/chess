export interface Song{
    id:number;
    title:string;
    artist:string;
    viewsCount:number;
    rating:SongRating;
    link:string
}

export enum SongRating{
    None,
    Like,
    Dislike,
}