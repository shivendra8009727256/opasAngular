import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-share',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="social-share-container">
      <!-- Social icons (hidden by default) -->
      <div class="social-share-buttons" [class.visible]="showSocialIcons">
        <!-- Facebook -->
        <a (click)="shareOnFacebook()" class="social-button facebook" title="Share on Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        </a>

        <!-- X (Twitter) -->
        <a (click)="shareOnTwitter()" class="social-button x-twitter" title="Share on X">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26 8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        <!-- LinkedIn -->
        <a (click)="shareOnLinkedIn()" class="social-button linkedin" title="Share on LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>

        <!-- WhatsApp -->
        <a (click)="shareOnWhatsApp()" class="social-button whatsapp" title="Share on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        <!-- Instagram -->
        <a (click)="shareOnInstagram()" class="social-button instagram" title="Share on Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>

      <!-- Main share button -->
      <button class="share-toggle-button" (click)="toggleSocialIcons()" title="Share this content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .social-share-container {
      position: fixed;
      right: 20px;
      top: 80px;
      z-index: 1000;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }

    .share-toggle-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #4285f4;
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .share-toggle-button:hover {
      background-color: #3367d6;
      transform: scale(1.1);
    }

    .share-toggle-button svg {
      width: 24px;
      height: 24px;
    }

    .social-share-buttons {
      display: flex;
      flex-direction: row;
      gap: 10px;
      opacity: 0;
      visibility: hidden;
      transform: translateX(20px);
      transition: all 0.3s ease;
      position: absolute;
      right: 60px; /* Position to the left of the toggle button */
    }

    .social-share-buttons.visible {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    .social-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .social-button:hover {
      transform: translateY(-3px) scale(1.1);
    }
    
    .facebook {
      background-color: #3b5998;
      color: white;
    }
    
    .x-twitter {
      background-color: #000000;
      color: white;
    }
    
    .linkedin {
      background-color: #0077b5;
      color: white;
    }
    
    .whatsapp {
      background-color: #25d366;
      color: white;
    }
    
    .instagram {
      background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
      color: white;
    }
    
    .social-button svg {
      width: 20px;
      height: 20px;
    }
  `]
})
export class SocialShareComponent {
  @Input() url: string = window.location.href;
  @Input() title: string = document.title;
  @Input() description: string = '';
  @Input() hashtags: string = '';
  @Input() imageUrl: string = '';
  showSocialIcons = false;

  toggleSocialIcons() {
    this.showSocialIcons = !this.showSocialIcons;
  }

  shareOnFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnTwitter() {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.url)}&text=${encodeURIComponent(this.title)}&hashtags=${encodeURIComponent(this.hashtags)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnLinkedIn() {
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.url)}&title=${encodeURIComponent(this.title)}&summary=${encodeURIComponent(this.description)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnWhatsApp() {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${this.title} ${this.url}`)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnInstagram() {
    const caption = encodeURIComponent(`${this.title}\n\n${this.url}`);
    const shareUrl = `https://www.instagram.com/create/story?caption=${caption}`;
    this.openShareWindow(shareUrl);
  }

  private openShareWindow(url: string) {
    window.open(url, '_blank', 'width=600,height=400');
    this.showSocialIcons = false;
  }
}