const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logs = new Schema ({

    title: {
        type: String,
        required: true
    }, 
    URL: {
        type: String,
        required: true
    }, 
    location: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        require: true
    }

});

const Logs = mongoose.model("imageUpload", logs);
module.exports = Logs;