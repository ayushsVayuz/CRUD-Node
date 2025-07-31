import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');

const IV_LENGTH = 16;

/**
 * @param {string} text - Plain text to encrypt using AES
 * @param {Buffer} aesKey - 32-byte AES key
 * @returns {string} - Encrypted text with IV prepended (Base64 format)
 */
export function aesEncrypt(text, aesKey) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('base64') + ':' + encrypted;
}

/**
 * @param {string} encryptedText - Encrypted text in 'IV:Ciphertext' Base64 format
 * @param {Buffer} aesKey - 32-byte AES key
 * @returns {string} - Decrypted plain text
 */
export function aesDecrypt(encryptedText, aesKey) {
  const [ivBase64, encryptedBase64] = encryptedText.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
  let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * @param {Buffer} aesKey - AES key to encrypt using RSA public key
 * @returns {string} - RSA-encrypted AES key in Base64 format
 */
export function rsaEncryptAESKey(aesKey) {
  return crypto.publicEncrypt(publicKey, aesKey).toString('base64');
}

/**
 * @param {string} encryptedKey - RSA-encrypted AES key in Base64 format
 * @returns {Buffer} - Decrypted AES key as a Buffer
 */
export function rsaDecryptAESKey(encryptedKey) {
  return crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, 'base64'));
}
