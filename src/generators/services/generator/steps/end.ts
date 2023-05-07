import chalk from 'chalk';
import { ServicesAnswers } from '@/generators/services/types';

export default function (answers: ServicesAnswers) {
  console.log(`\nDone. Now run:\n`)

  console.error(`  ${chalk.green(`cd ${answers.projectName}`)}`);
  console.error(`  ${chalk.green(`docker-compose up -d`)}`);
};
