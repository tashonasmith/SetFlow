var mongoose = require("mongoose");

var Schema = mongoose.Schema

var setlistSchema = new Schema({
    user:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: true
    },
    songs:[{
        type: Schema.Types.ObjectId,
        ref: "Lyrics"
    }],
    gigs: [{
        type: Schema.Types.ObjectId,
        ref: "Gig"
    }]
})

const Setlist = mongoose.model("Setlist", setlistSchema)
module.exports = Setlist