const agenda = require("../helper/queue.helper");
const walletModel = require("../models/wallet.model");

module.exports = {
    createWallet: agenda.define("create-wallet", async (job) => {
        const { userId } = job.attrs.data;
        console.log(`🔵 Processing job: Creating wallet for user ${userId}`);

        try {
            await walletModel.create({ user: userId });
            console.log(`✅ Wallet created successfully for user: ${userId}`);
        } catch (error) {
            console.error(`❌ Error creating wallet for user ${userId}:`, error);
        }
    })
}

