import NodeCache from 'node-cache';

export class Cache {
  private cacheNode: NodeCache;

  constructor(ttl: number, checkPeriod: number) {
    this.cacheNode = new NodeCache({ stdTTL: ttl, checkperiod: checkPeriod });
  }

  public has(key: string) {
    return this.cacheNode.has(key);
  }

  public get(key: string) {
    return this.cacheNode.get(key);
  }

  public getJSON(key: string): any | false {
    if (this.has(key)) {
      return JSON.parse(this.get(key) as string);
    }
    return false;
  }

  public set(key: string, value: any) {
    return this.cacheNode.set(key, JSON.stringify(value));
  }

  public clear(key: string) {
    const resourceKeys = this.cacheNode.keys().filter((k) => k.includes(key));
    this.cacheNode.del(resourceKeys);
  }
}
