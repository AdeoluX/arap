/**
 * Databases connector class
 * Should contain all db connection or multiple connections logic
 * Should be injected into ServerBulder class
 */
class DatabaseConnector {
  constructor() {
    // use env here from process env
  }

  // example methods
  async connectMongo() {
    // add mongo/mongoose connect to database
  }

  async connectPG() {
    // add postgres connection
  }

  // add more needed connections here
}

module.exports = DatabaseConnector
