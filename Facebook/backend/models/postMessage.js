import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name:String,
    tags: [String],
    selectedFile: String,
    likes:{
        type: [String],// array of id's
        default: []
    },
    comments: {
        type :[String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;