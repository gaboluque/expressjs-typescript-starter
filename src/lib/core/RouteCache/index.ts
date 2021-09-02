import { Cache } from '../utils/Cache';

export class RouteCache {
  private static _instance: Cache;

  public static get instance() {
    if (!this._instance) this._instance = new Cache(600, 660);
    return this._instance;
  }
}
