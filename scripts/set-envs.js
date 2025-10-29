const { writeFileSync, mkdirSync } = require('fs');
require("dotenv").config();

const targetPath = "./src/environments/environments.ts";

const envFileContent = `
export const enviroments = {
    baseURL: "${process.env.API_BASE_URL}",
    apiKey: "${process.env.API_KEY}"
}
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent)