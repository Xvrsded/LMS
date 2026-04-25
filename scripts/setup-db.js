const { execSync } = require('child_process');

console.log('Setting up database...');

try {
  // Create database if it doesn't exist
  execSync('createdb lms_db', { stdio: 'inherit' });
  console.log('Database created successfully');
} catch (error) {
  console.log('Database might already exist or PostgreSQL is not running');
}

try {
  // Run migrations
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  console.log('Migrations completed successfully');
} catch (error) {
  console.log('Migration failed, you might need to run it manually');
}

console.log('Database setup completed!');
