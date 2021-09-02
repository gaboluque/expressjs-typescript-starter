import { Router } from 'express';

export class AppRouter {
  private static instance: Router;

  static getInstance(): Router {
    if (!AppRouter.instance) AppRouter.instance = Router();

    return AppRouter.instance;
  }

  public static getRoutes() {
    const routes = AppRouter.getInstance().stack;
    return routes.map((r) => {
      return `${Object.keys(r.route.methods)[0]} - ${r.route.path}`;
    });
  }
}
