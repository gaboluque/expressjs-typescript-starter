const simpleProjection = (values: string, prefix?: string) =>
  values
    .replace(/,/g, '')
    .split(' ')
    .reduce((projection, value) => {
      const p: { [key: string]: 1 | 0 } = { ...projection };
      const exclude = value.includes('-');
      let key = exclude ? value.split('-')[1] : value;
      if (prefix) key = `${prefix}.${key}`;
      p[key] = exclude ? 0 : 1;
      return p;
    }, {});

const simpleLookup = (from: string, localField: string, foreignField: string, as: string) => ({
  from,
  localField,
  foreignField,
  as,
});

// const pipelineLookup = (from: string, as: string, pipeline: any[]) => ({
//   from,
//   pipeline,
//   as,
// });

const arrayElementAt = (field: string, position = 0) => ({
  $arrayElemAt: [`$${field}`, position],
});

export { simpleProjection, simpleLookup, arrayElementAt };
