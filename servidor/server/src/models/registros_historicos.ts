import mongoose, {Schema, model} from 'mongoose'



export interface Historicos extends  mongoose.Document{
    _id:mongoose.Types.ObjectId,
    titulo:String,
    autores:String,
    isbn:Number,
    calificacion_promedio:Number
}




export const espquemaHistoricos = new Schema({
    _id:mongoose.Types.ObjectId,
    titulo:String,
    autores:String,
    isbn:Number,
    calificacion_promedio:Number

})


export default model<Historicos>("registros_historicos",espquemaHistoricos);
