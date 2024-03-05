const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: "Movies",
    },
    timeTable: [
        {
            date: String,
            time:[
                {
                    ScreenNo: Number,
                    time: String,
                },
            ],
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admins",
    },
    updateBy: {
        type: Schema.Types.ObjectId,
        ref: "Admins",
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    updated:{
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model("Times", TimeSchema);
