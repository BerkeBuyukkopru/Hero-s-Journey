using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ortak_Katman
{
    public class Hero
    {
        public int HeroId { get; set; }
        public string HeroName { get; set; }
        public int HeroAttackMin { get; set; }
        public int HeroAttackMax { get; set; }
        public int HeroDefenceMin { get; set; }
        public int HeroDefenceMax { get; set; }
        public int HeroPotMin { get; set; }
        public int HeroPotMax { get; set; }
        public int HeroHealth { get; set; }
        public int HeroLevel { get; set; }
        public int MaxHealth { get; set; }
        public string HeroImagePath { get; set; }
    }
}
