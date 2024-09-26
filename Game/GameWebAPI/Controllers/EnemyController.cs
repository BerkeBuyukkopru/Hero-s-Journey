using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL;
using Ortak_Katman;
using System.Web.Http;

namespace GameWebAPI.Controllers
{
    public class EnemyController : ApiController
    {
        private EnemyService _enemyService;
      
        [HttpGet]
        public IHttpActionResult GetRandomEnemyByLevel(int level)
        {
            if (level <= 0)
            {
                return Ok(new { success = false, message = "Geçersiz seviye." }); 
            }
            try
            {
                _enemyService = new EnemyService();
                Enemy enemy = _enemyService.GetRandomEnemyByLevel(level);
                if (enemy == null)
                {
                    return Ok(new { success = false, message = "Düşman bulunamadı." });
                }

                return Ok(new { success = true, enemy = enemy }); 
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
    }
}