const Replicate = require('replicate');

class ReplicateService {
  constructor(apiToken) {
    this.replicate = new Replicate({
      auth: apiToken,
    });
  }

  async fetchData(prompt) {
    const input = { prompt };

    try {
      const events = [];
      for await (const event of this.replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
        events.push(event.toString());
      }

      return events;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReplicateService;
