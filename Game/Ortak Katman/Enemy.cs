using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ortak_Katman
{
    public class Enemy
    {
        public int EnemyId { get; set; }
        public string EnemyName { get; set; }
        public int EnemyLevel { get; set; }
        public int EnemyAttackMin { get; set; }
        public int EnemyAttackMax { get; set; }
        public int EnemyHealth { get; set; }
        public string EnemyImagePath { get; set; }
    }
}
