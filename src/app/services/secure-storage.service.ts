import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  constructor(private encryptionService: EncryptionService) { }

  setItem(key: string, value: any): void {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const encryptedValue = this.encryptionService.encrypt(stringValue);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error encrypting data:', error);
      throw new Error('Failed to encrypt storage data');
    }
  }

  getItem(key: string): any {
    try {
      const encryptedValue = localStorage.getItem(key);
      
      if (!encryptedValue) {
        return null;
      }

      const decryptedValue = this.encryptionService.decrypt(encryptedValue);
      
      // Try to parse as JSON, return as string if parsing fails
      try {
        return JSON.parse(decryptedValue);
      } catch (e) {
        return decryptedValue;
      }
    } catch (error) {
      console.error('Error decrypting data:', error);
      this.removeItem(key); // Clean up corrupted data
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}