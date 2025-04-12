const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

console.log("PubSub.asyncIterator:", typeof pubsub.asyncIterator);

module.exports = pubsub;
