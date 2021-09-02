import { NextFunction, Request, Response } from 'express';
import ServerError from '../exceptions/ServerError';
import { RouteCache } from '../../lib/core/RouteCache';
import logSubscriber from '../subscribers/logSubscriber';

const validCacheUrl = (url: string) => {
  const validRoutes = ['/helpers/labels'];
  const invalidRoutes = ['/me/'];
  if (invalidRoutes.some((r) => url.includes(r))) return false;
  return validRoutes.some((r) => url.includes(r));
};

export const cacheCatcher = (req: Request, res: Response, next: NextFunction) => {
  const { send } = res;
  const { url, method } = req;

  if (method === 'GET' && validCacheUrl(url)) {
    try {
      const key = url;

      if (RouteCache.instance.has(key)) {
        const body = RouteCache.instance.getJSON(key);
        logSubscriber.emit('info', `[${method}] ${url} - Responded with cache data`);
        res.send(body);
      } else {
        // @ts-ignore
        // eslint-disable-next-line func-names
        res.send = function (body) {
          if (body.success) RouteCache.instance.set(key, body);
          send.call(this, body);
        };

        next();
      }
    } catch (e) {
      throw new ServerError(e);
    }
  } else {
    next();
  }
};
