import { importSampleData } from '../src/utils/importData';

async function main(): Promise<void> {
  console.log('🔧 Setting up database with sample data...');
  try {
    // importSampleData may run synchronously or return a Promise
    await importSampleData();
    console.log('Database setup completed successfully!');
  } catch (error: unknown) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

main();