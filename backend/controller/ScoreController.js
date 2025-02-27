const scoreJob = require('../jobs/ScoreJob');

exports.getGiftsController = async(req,res)=>{
    const prices = await scoreJob.getPrices();
    return res.status(200).json({success:true,prices});
}
exports.addScoreController = async (req, res) => {
    const { userId, totalScore, bonusesReceived, prizesWon } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const result = await scoreJob.addScores(userId, totalScore, bonusesReceived, prizesWon);
        res.status(200).json({ success: true, message: "Scores synced successfully!", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};