import { prisma } from '../prisma';
import { kv } from '@vercel/kv';

async function migrate() {
  console.log('Starting migration from Prisma to Vercel KV...');

  try {
    const allViews = await prisma.views.findMany();

    if (allViews.length === 0) {
      console.log('No views found in the database. Nothing to migrate.');
      return;
    }

    console.log(`Found ${allViews.length} records to migrate.`);

    for (const view of allViews) {
      console.log(`Migrating slug: ${view.slug}, count: ${view.count}`);
      await kv.set(view.slug, view.count);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('An error occurred during migration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
