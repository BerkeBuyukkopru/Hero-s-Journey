using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL; //referans ekledim
using Ortak_Katman; //referans ekledim

//Düşman ile ilgili iş mantıkları ve kurallar burada tanımlanacak.
namespace BLL
{
    public class EnemyService
    {
        private EnemyRepository _enemyRepository;

        // Constructor
        public EnemyService()
        {
            _enemyRepository = new EnemyRepository(); //constructer hangi tasarım şablonana denk gelio angular
        }
        // Belirli bir EnemyId'ye sahip düşmanı al
        public List<Enemy> GetEnemiesByLevel(int level)
        {
            List<Enemy> enemies = _enemyRepository.GetEnemiesByLevel(level);
            return enemies;
        }
        public Enemy GetRandomEnemyByLevel(int level) //düşmanın rastgele gelmesini sağlıyoruz.
        {
            var enemies = _enemyRepository.GetEnemiesByLevel(level); //Oynanan seviyedeki düşnamları alır.
            if (enemies.Count == 0)
                return null; //düşman yoksa null döndür

            Random rand = new Random(); //random nesnesi oluşturduk.
            int randomIndex = rand.Next(enemies.Count); //rastgele bir sayı ürettik (0-1)
            return enemies[randomIndex]; //randomindexe göre düşman döndür.
        }
    }
}
