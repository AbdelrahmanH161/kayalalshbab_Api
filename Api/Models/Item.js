const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
        },
    title: {
        type: String,
        required: true,
        },
    price: {
        type: Number,
        required: true,
        },
    image:{
        type:String,
        required: true,
        },
    description: {
        type: String,
        },
    calories:{
        type: Number,
        }
    },
    { versionKey: false}
);

module.exports = mongoose.model("ItemCollection", ItemSchema);