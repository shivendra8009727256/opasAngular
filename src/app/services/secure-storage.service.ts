import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  constructor(
    private encryptionService: EncryptionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: any): void {
    if (!this.isBrowser()) return;

    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const encryptedValue = this.encryptionService.encrypt(stringValue);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error encrypting data:', error);
    }
  }

  getItem(key: string): any {
    if (!this.isBrowser()) return null;

    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;

      const decryptedValue = this.encryptionService.decrypt(encryptedValue);
      try {
        return JSON.parse(decryptedValue);
      } catch {
        return decryptedValue;
      }
    } catch (error) {
      console.error('Error decrypting data:', error);
      this.removeItem(key); // Clean up corrupted data
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}
