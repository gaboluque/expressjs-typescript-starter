const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create Module',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './tools/templates/module/',
    },
    stringReplacers: [{ question: 'Enter model name', slot: '__modelName__' }],
    output: {
      path: './src/modules/__modelName__s',
      pathAndFileNameDefaultCase: '(camelCase)',
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);
