using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ortak_Katman
{
    public class HeroTemplate
    {
        public int HTId { get; set; }
        public string HTName { get; set; }
        public int HTAttackMin { get; set; }
        public int HTAttackMax { get; set; }
        public int HTDefenceMin { get; set; }
        public int HTDefenceMax { get; set; }
        public int HTPotMin { get; set; }
        public int HTPotMax { get; set; }
        public int HTHealth { get; set; }
        public int HTLevel { get; set; }
        public string HTImagePath { get; set; }
    }
}
