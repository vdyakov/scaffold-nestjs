import chalk from 'chalk';
import { ServicesAnswers } from '@/generators/services/types';

export default function (answers: ServicesAnswers) {
  console.log(`\nDone. Now run:\n`)

  console.error(`  ${chalk.green(`1. cd ${answers.projectName}`)}`);
  console.error(`  ${chalk.green(`2. check .env file`)}`);
  console.error(`  ${chalk.green(`3. docker-compose up -d --build`)}`);
  console.error(`  ${chalk.green(`4. http://localhost:3000/api`)}`);
};
