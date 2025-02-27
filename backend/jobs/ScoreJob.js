const Score = require('../models/Score');
const User = require('../models/User');
const PRICES = ['HAND','GIFT','GOLDTROPHY','SILVERTROPHY','CHOCLATECOOKIE'];

exports.getPrices = ()=>{
    return PRICES;
}

exports.addScores = async (userId, totalScore, bonusesReceived, prizesWon) => {
    try {
        // Find and update the Score document, returning the new or existing one
        const score = await Score.findOneAndUpdate(
            { userId },
            {
                $set: { totalScore },
                $push: {
                    bonusesReceived: { $each: bonusesReceived || [] },
                    prizesWon: { $each: prizesWon || [] }
                }
            },
            { upsert: true, new: true } 
        );

        if (!score) throw new Error("Score update failed");

    
        await User.findByIdAndUpdate(userId, { score: score._id });

        return score;
    } catch (error) {
        console.error("Error updating score:", error);
        throw new Error("Database error while updating score");
    }
};

