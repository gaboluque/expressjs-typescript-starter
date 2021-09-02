export interface IPage {
  docs: any[];
  totalDocs: number;
  hasNextPage: boolean;
}

const pageTemplate = (kind: string, { docs, totalDocs, hasNextPage }: IPage) => ({
  kind,
  totalDocs,
  docs,
  hasNextPage,
});

export default pageTemplate;
