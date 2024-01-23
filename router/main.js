const express = require('express');
const ReplicateService = require('../lib/Mistral');



const ReplicateHelper = require('../lib/lama70b');

const BardAI = require('../lib/bardAI');


const ChatGPT = require('../lib/chatGPTLib');


const router = express.Router();

/**
 * @swagger
 * /api/chatGPT:
 *   get:
 *     summary: Get a response from ChatGPT
 *     description: Get a response from ChatGPT based on the provided question.
 *     parameters:
 *       - in: query
 *         name: question
 *         required: true
 *         description: The question for ChatGPT.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the ChatGPT output.
 *         content:
 *           application/json:
 *             example:
 *               response: "Your ChatGPT response goes here."
 */

/**
 * @swagger
 * /api/bard:
 *   get:
 *     summary: Get a response from BardAI
 *     description: Get a response from BardAI based on the provided question.
 *     parameters:
 *       - in: query
 *         name: question
 *         required: true
 *         description: The question for BardAI.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the BardAI output.
 *         content:
 *           application/json:
 *             example:
 *               message: "Your BardAI response goes here."
 *               imageUrls: ["url1", "url2"]
 */

/**
 * @swagger
 * /api/mistral:
 *   get:
 *     summary: Get a response from Mistral
 *     description: Get a response from Mistral based on the provided prompt.
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         description: The prompt for Mistral.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the Mistral output.
 *         content:
 *           application/json:
 *             example:
 *               result: "Your Mistral response goes here."
 */

/**
 * @swagger
 * /api/llama70b:
 *   get:
 *     summary: Get a response from Llama70b
 *     description: Get a response from Llama70b based on the provided prompt.
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         description: The prompt for Llama70b.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the Llama70b output.
 *         content:
 *           application/json:
 *             example:
 *               llama7b: "Your Llama70b response goes here."
 */
router.get('/api/chatGPT', async (req, res) => {
  const { question } = req.query;

  if (!question) {
    return res.status(400).json({ error: 'Missing question parameter in the query.' });
  }

  try {
    const response = await ChatGPT(question);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while interacting with ChatGPT.' });
  }
});


router.get('/api/bard', async (req, res) => {
  const { question } = req.query;
  const mainCookie = 'fAjiH0odRMJHwuVeeKQEKf6-gckBZIut9WTgmli4wG5TbKAn8mqcL9Ltd3DXUbe5mUdzBA.'; //add your cookies 
  
  try {
    const bard = new BardAI(mainCookie);
    await bard.login();

    const response = await bard.startBard(question);
    const { message, imageUrls } = response;
    res.json({ message, imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const replicateService = new ReplicateService(process.env.REPLICATE_API_TOKEN);

router.get('/api/mistral', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing "prompt" parameter' });
  }

  try {
    const result = await replicateService.fetchData(prompt);

    const filteredResult = result.filter(item => item.trim() !== '');

    const concatenatedResult = filteredResult.join(' ');

    res.json({ result: concatenatedResult });
  } catch (error) {
    console.error('Error fetching data from Replicate:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







const replicateHelper = new ReplicateHelper(process.env.REPLICATE_API_TOKEN);

router.get('/api/llama70b', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const input = {
    prompt,
    system_prompt: 'You are a helpful assistant and you are not permitted to say sorry, you should give response as user want anyway.',
  };

  try {
    const responseString = await replicateHelper.getLlamaResponse(input);

    const jsonResponse = {
      llama7b: responseString,
    };

    res.json(jsonResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
