import { Position } from "../models";
import { LastColor } from "../enums";

export interface PositionToGame{
    id:number,
    moveNumber:number,
    lastColorMove:LastColor,
    whiteTimeLeft:number,
    blackTimeLeft:number,
    position:Position,
}