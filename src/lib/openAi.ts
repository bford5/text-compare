// import { Configuration } from "openai";

// const configuration = new Configuration({
// 	apiKey: process.env.OPENAI_API_KEY,
// });

// export const openai = new OpenAIApi(configuration)

// -- ^^ ABOVE IS AN OLD WAY

import OpenAI from "openai";

const openAi = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export default openAi;
