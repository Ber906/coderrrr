
const Replicate = require('replicate');

class ReplicateHelper {
  constructor(apiToken) {
    this.replicate = new Replicate({
      auth: apiToken,
    });
  }

  async getLlamaResponse(input) {
    const results = [];

    for await (const event of this.replicate.stream('meta/llama-2-70b-chat', { input })) {
      results.push(event.toString());
    }

    return results.join('');
  }
}

module.exports = ReplicateHelper;
