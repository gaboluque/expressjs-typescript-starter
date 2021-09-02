module.exports = {
  mongodb: {
    url: process.env.ROOT_MONGODB_URL,
    databaseName: process.env.DATABASE_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: __dirname + '/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.ts',
};
