import { PromptObject } from 'prompts';
import Questionnaire from '@/lib/questionnaire.js';
import { DatabaseAnswers } from '@/generators/database/types';

export default class DatabaseQuestionnaire extends Questionnaire<DatabaseAnswers> {
  protected get questions(): PromptObject[] {
    let database: string | null = null;

    return [
      {
        name: 'database',
        type: 'select',
        message: 'Select Database:',
        choices: [
          { title: 'MongoDB', value: 'mongo' },
          { title: 'MySql', value: 'mysql' },
          { title: 'PostgreSQL', value: 'postgres' }
        ],
        initial: 0,
        onState: (state) => {
          database = String(state.value).trim();
        },
      },
      {
        name: 'orm',
        type: () => database !== 'mongo' ? 'select' : null,
        message: 'Select ORM:',
        choices: [
          { title: 'Prisma', value: 'prisma' },
          { title: 'MikroORM', value: 'mikroorm' },
          { title: 'TypeORM', value: 'typeorm' }
        ],
        initial: 0,
      },
      {
        name: 'odm',
        type: () => database === 'mongo' ? 'select' : null,
        message: 'Select ODM:',
        choices: [
          { title: 'Mongoose', value: 'mongoose' },
          { title: 'Prisma', value: 'prisma' },
        ],
        initial: 0,
      },
    ];
  }
}
