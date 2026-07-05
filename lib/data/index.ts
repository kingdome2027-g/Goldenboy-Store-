import { memoryStore } from './memoryStore';
import { GoogleSheetsDataStore } from './googleSheetsAdapter';

const sheetId = process.env.SHEET_ID;
const serviceAccountKeyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

export const dataStore =
  sheetId && serviceAccountKeyPath
    ? new GoogleSheetsDataStore(sheetId, serviceAccountKeyPath)
    : memoryStore;
