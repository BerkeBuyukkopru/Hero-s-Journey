import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { EnemyService } from '../services/enemy.service';
import { levelmodel } from '../models/levelmodel';
import { enemymodel } from '../models/enemymodel';
import { heromodel } from '../models/heromodel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  heroId: number;
  heroName: string;
  heroActionLog: string = '';
  heroActionLog1:string;
  enemyActionLog: string = ''; 

  hero: heromodel;
  enemy: enemymodel;
  level: levelmodel;

  defending: boolean = false;
  isHealButtonDisabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private enemyService: EnemyService
  ) { }

  ngOnInit(): void {
  
    this.level = new levelmodel();
    this.level.LevelNumber = 1// Oyuna başlarken ilk level
    // Query params'ten heroId ve heroName'i al
    this.route.queryParams.subscribe(params => {
      this.heroId = params['heroId'];
      this.heroName = params['heroName'];
      this.initializeHero();
      this.initializeEnemy();
    });
  }

  resetHealButton(): void {
    this.isHealButtonDisabled = false;
  }

  // Kahraman bilgilerini al ve ayarla
  initializeHero(): void {
    
    this.heroService.GetHero(this.heroId).subscribe(
      (data: any) => {
        
        this.hero = data.hero;
        this.hero.HeroName = this.heroName; // heroName'i modele ata
        //this.hero.HeroHealth;
        this.hero.MaxHealth = this.hero.HeroHealth;

        this.resetHealButton();
      });
  }

  initializeEnemy(): void {
    this.enemyService.GetRandomEnemyByLevel(this.level.LevelNumber).subscribe(
      (data: any) => {
        
        this.enemy = data.enemy;
        this.enemy.EnemyMaxHealth=this.enemy.EnemyHealth;
    });
  }

  heroAttack(): void {
    //Math.floor() sayıyı yuvarlar.
    //Math.random() 0 ile 1 arasında rastgele bir ondalık sayı üretir.
    if (this.hero && this.enemy) {
      const heroAttackPower = Math.floor(Math.random() * (this.hero.HeroAttackMax - this.hero.HeroAttackMin + 1)) + this.hero.HeroAttackMin;
      this.enemy.EnemyHealth -= heroAttackPower;

      if (this.enemy.EnemyHealth <= 0) {
        this.enemy.EnemyHealth = 0;
        if (this.enemy.EnemyLevel < 5) {
          alert(`${this.enemy.EnemyName} Yenildi. Sonraki Seviyeye Geç.`);
        }
        this.heroUpdate();
      }
      else {
        this.enemyActionLog=(`${this.enemy.EnemyName} Adlı Düşmana ${heroAttackPower} Hasar Verdin. <br> Kalan Düşman Sağlığı: ${this.enemy.EnemyHealth}`);
        // Düşman saldırısı
        this.enemyAttack();
      }
    }
  }
  enemyAttack(): void {
    if (this.hero && this.enemy) {
      const enemyAttackPower = Math.floor(Math.random() * (this.enemy.EnemyAttackMax - this.enemy.EnemyAttackMin + 1)) + this.enemy.EnemyAttackMin;
    
      if(this.defending){
        this.heroDefence(enemyAttackPower);
        if (this.hero.HeroHealth <= 0) {
            this.hero.HeroHealth = 0;
            alert(`Oyunu KAYBETTİN.
    Giriş Sayfasına Yönlendiriliyorsun...`);
            this.router.navigate(['/login']);
          } 
          else {
            this.heroActionLog=(`${this.heroActionLog1}, ${enemyAttackPower} Hasar Aldın.<br>Kalan Sağlık: ${this.hero.HeroHealth}`);  
        this.defending = false;
      }
    }
    else{
        this.hero.HeroHealth -= enemyAttackPower;
        if (this.hero.HeroHealth <= 0) {
            this.hero.HeroHealth = 0;
            alert(`Oyunu KAYBETTİN.
    Giriş Sayfasına Yönlendiriliyorsun...`);
            this.router.navigate(['/login']);
          } 
          else {
            this.heroActionLog=(`${enemyAttackPower} Hasar Aldın.<br>Kalan Sağlık: ${this.hero.HeroHealth}`);  
        this.defending = false;
      }
    }
  }
}

  heroDefence(enemyAttackPower: number): void {
    if (this.hero) {
      
      // Kahramanın savunma gücünü hesapla
      const defencePower = Math.floor(Math.random() * (this.hero.HeroDefenceMax - this.hero.HeroDefenceMin + 1)) + this.hero.HeroDefenceMin;

      // Düşmanın saldırısından savunma gücünü çıkararak etkili hasarı hesapla
      const effectiveDamage = Math.max(enemyAttackPower - defencePower, 0);

      // Kahramanın sağlığını güncelle
      this.hero.HeroHealth -= effectiveDamage;

      this.heroActionLog1=(`${defencePower} Değerinde Hasar Engelledin`);
    }
  }

  defend(): void {
    this.defending = true;
    this.enemyAttack();
  }

  heroHeal(): void {
    if (this.isHealButtonDisabled) {
      this.heroActionLog=('Tekrar Can Basamazsın.');
      return;
    }
    if (this.hero) {
      
      if (this.hero.HeroHealth >= this.hero.MaxHealth) {
        this.hero.HeroHealth = this.hero.MaxHealth;
        this.heroActionLog=(`Sağlığın Tamamen Dolu`);
      }
      else{
        const healingPower = Math.floor(Math.random() * (this.hero.HeroPotMax - this.hero.HeroPotMin + 1)) + this.hero.HeroPotMin;
        this.hero.HeroHealth += healingPower;
        this.heroActionLog=(`Sağlık Potu Kullandın.<br>${healingPower} Can İyileştin`);

        this.isHealButtonDisabled = true;
      }
    }
  }

  heroUpdate(): void {
    if (this.hero && this.level) {
      this.enemyActionLog = '';
      this.heroActionLog = '';
      if (this.level.LevelNumber < 5) {
        
        this.level.LevelNumber++;
        this.heroService.UpdateHeroStats(this.hero.HeroId, this.level.LevelNumber).subscribe(
          (data: any) => {

            this.hero = data.hero;
            this.initializeHero()
            this.initializeEnemy();
          });
      }
      else {
        alert(`Oyun Bitti. Tüm Düşmanları Yok Ettin.
Giriş Sayfasına Yönlendiriliyorsun...`);
        this.router.navigate(['/login']);
      }
    }
  }
}
