import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { statesTable, citiesTable } from '../../../db/schemas';

export const seedStatesAndCities = async () => {
  const stateSeedData = [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' },
    { code: 'FL', name: 'Florida' },
    { code: 'IL', name: 'Illinois' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'OH', name: 'Ohio' },
    { code: 'MI', name: 'Michigan' },
    { code: 'GA', name: 'Georgia' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'WA', name: 'Washington' },
    { code: 'OR', name: 'Oregon' },
    { code: 'CO', name: 'Colorado' }
  ];

  await db.insert(statesTable).values(stateSeedData);
  const allStates = await db.select().from(statesTable);

  await seed(db, { citiesTable }, { seed: 1 }).refine(funcs => ({
    citiesTable: {
      count: 50,
      columns: {
        name: funcs.city(),
        stateId: funcs.valuesFromArray({
          values: allStates.map(state => state.id)
        })
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ States and cities seeded!');
};
