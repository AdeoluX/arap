const Agenda = require('agenda');
const walletModel = require("../models/wallet.model");

const mongoConnectionString = process.env.MONGO_URI;
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'agendaJobs' } });


agenda.define("create-wallet", async (job) => {
    const { userId } = job.attrs.data;
    console.log(`🔵 Processing job: Creating wallet for user ${userId}`);

    try {
        await walletModel.create({ user: userId });
        console.log(`✅ Wallet created successfully for user: ${userId}`);
    } catch (error) {
        console.error(`❌ Error creating wallet for user ${userId}:`, error);
    }
})

agenda.define("create-wallet2", async (job) => {
  const { userId } = job.attrs.data;
  console.log(`🔵 Processing job: Creating wallet for user ${userId}`);

  try {
    await walletModel.create({ user: userId });
    console.log(`✅ Wallet created successfully for user: ${userId}`);
  } catch (error) {
    console.error(`❌ Error creating wallet for user ${userId}:`, error);
  }
});

agenda.on("ready", () => console.log("✅ Agenda connected to MongoDB"));
agenda.on("error", (error) => console.error("❌ Agenda connection error:", error));


agenda.on("start", (job) => console.log(`🚀 Job started: ${job.attrs.name}`));
agenda.on("success", (job) => console.log(`✅ Job completed: ${job.attrs.name}`));
agenda.on("fail", (err, job) => console.error(`❌ Job failed: ${job.attrs.name}`, err));
// (async function () {
//     await agenda.start();
// })();

module.exports = agenda;