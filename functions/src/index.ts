/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// import * as logger from 'firebase-functions/logger';
import { onRequest, HttpsFunction } from 'firebase-functions/v2/https';
import { Request, Response } from 'express';
import next from 'next';

const isDev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDev, conf: { distDir: '.next' } });
const handle = nextApp.getRequestHandler();

export const nextServer: HttpsFunction = onRequest(
    async (req: Request, res: Response) => {
        await nextApp.prepare();
        return handle(req, res);
    },
);
