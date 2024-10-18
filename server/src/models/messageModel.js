import mongoose, { mongo } from "mongoose";

const messageModel = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: "String",
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },

}, {
    timestamps: true
});

const message = mongooose.model("Message", messageModel)

export default message