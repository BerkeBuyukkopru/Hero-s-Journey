import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { heromodel } from '../models/heromodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  heroName: string = '';
  templateId: number = 1; // Varsayılan bir templateId

  constructor(private heroService: HeroService, private router: Router) {}

  onLogin() {
    if (this.heroName && this.heroName.trim().length > 0) {
      // HeroService ile yeni bir kahraman oluştur
      this.heroService.InitializeHeroFromTemplate(this.templateId, this.heroName)
        .subscribe(
          (returnModel : any ) => {
            
            const heroId = returnModel.hero.HeroId; // Yeni oluşturulan kahramanın ID'sini alıyoruz
            const heroName = returnModel.hero.HeroName; // Kahramanın adını alıyoruz
            
            // game component'ine yönlendir ve heroId ve heroName'i query params olarak ekle
            this.router.navigate(['/game'], { queryParams: { heroId: heroId, heroName: heroName } });
          },
          (error: any) => {
            // Hata durumunda kullanıcıya mesaj göster
            console.error('HATA', error);
            alert('Bir hata oluştu: ' + (error.message || 'Bilinmeyen hata'));
          }
        );
    } else {
      // Eğer heroName boşsa kullanıcıya mesaj göster
      alert('Lütfen Bir İsim Giriniz!');
    }
    
  }
}
