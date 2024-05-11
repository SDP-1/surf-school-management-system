const Session = require("../models/SessionModel");


//display all sessions
const getAllSessions = async (req, res, next) => { 
    let sessions;
    //get all sessions
    try {
        sessions = await Session.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    //if not found
    if (!sessions || sessions.length === 0) {
        return res.status(404).json({ message: "Sessions Not Found" });
    }
    //display all sessions
    return res.status(200).json({ sessions });
};





//insert session
const addSessions = async (req, res, next) => {
    const{name,type,instructor,date,time} = req.body;

    let sessions;

    try{
        sessions = new Session({name,type,instructor,date,time});
        await sessions.save();
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
    }

    //if not insert sessions
    if(!sessions){
        return res.status(404).send({message:"unable to add session"});
    }
    return res.status(200).json({sessions});
};




//get session by id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let session;

    try{
        session = await Session.findById(id);
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
    }

    //if not available sessions
    if(!session){
        return res.status(404).send({message:"session not found"});
    }
    return res.status(200).json({session});
}





//update session details
const updateSession = async(req, res, next) => {
    const id = req.params.id;
    const{name,type,instructor,date,time} = req.body;

    let sessions;

    try{
        sessions = await Session.findByIdAndUpdate(id,
            {name:name,type:type,instructor:instructor,date:date,time:time});
            sessions = await sessions.save();
    }catch(err){
        console.log(err);
    }

    if(!sessions){
        return res.status(404).send({message:"unable to update session details"});
    }
    return res.status(200).json({sessions});

}






//delete session by id<<<
const deleteSession = async (req, res, next) => {
    const id = req.params.id;

    let session;

    try{
        session = await Session.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!session){
        return res.status(404).send({message:"unable to delete session"});
    }
    return res.status(200).json({session});
}



// Get count of all sessions
const getSessionCount = async (req, res, next) => {
    let count;
    try {
        count = await Session.countDocuments();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ count });
};






exports.getById = getById;
exports.addSessions = addSessions;
exports.getAllSessions = getAllSessions;
exports.updateSession = updateSession;
exports.deleteSession = deleteSession;
exports.getSessionCount = getSessionCount;