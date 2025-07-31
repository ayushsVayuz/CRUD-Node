/**
 * @param {string} encryptedData - AES-encrypted data
 * @param {string} encryptedKey - RSA-encrypted AES key
 * @returns {Object} - Simulated API response containing encrypted key and data
 */
export default function simulateEncryptedApiResponse(encryptedData, encryptedKey) {
  return {
    key: encryptedKey,
    data: encryptedData,
  };
}
