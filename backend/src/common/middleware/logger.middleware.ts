import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, path: url, body } = req;

  res.on('close', () => {
    const { statusCode, statusMessage } = res;

    console.log(
      `${method} ${url} ${body ? `\nbody: ${JSON.stringify(body)}` : ''}
      Response Status: ${statusCode} ${statusMessage}\n`,
    );
  });
  next();
}
