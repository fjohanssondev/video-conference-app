import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const db = drizzle(process.env.DATABASE_URL!);

export const meetings = pgTable('meetings', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
});