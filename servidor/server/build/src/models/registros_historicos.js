"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
exports.espquemaHistoricos = new mongoose_1.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    titulo: String,
    autores: String,
    isbn: Number,
    calificacion_promedio: Number
});
exports.default = mongoose_1.model("registros_historicos", exports.espquemaHistoricos);
