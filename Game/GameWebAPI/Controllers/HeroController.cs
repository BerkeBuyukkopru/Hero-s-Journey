using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL;
using Ortak_Katman;
using System.Web.Http;

namespace GameWebAPI.Controllers
{
    public class HeroController : ApiController
    {
        private HeroService _heroService;
        public class HeroBody
        {
            public int TemplateId { get; set; }
            public string HeroName { get; set; }
            public int HeroId { get; set; }
            public int HeroLevel { get; set; }
        }

        [HttpGet]
        public IHttpActionResult GetHero(int heroId)
        {
            try
            {
                // HeroService için gerekli parametreleri sağlıyoruz
                _heroService = new HeroService();
                Hero hero = _heroService.GetHero(heroId);
                if (hero == null)
                {
                    return Ok(new { success = false, message = "Kahraman Bulunamadı." });
                }
                return Ok(new { success = true, hero = hero });
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpPost]
        public IHttpActionResult InitializeHeroFromTemplate([FromBody] HeroBody heroBody)
        {
            try
            {
                // HeroService için gerekli parametreleri sağlıyoruz
                _heroService = new HeroService();
                var hero = _heroService.InitializeHeroFromTemplate(heroBody.TemplateId, heroBody.HeroName);
                return Ok(new { success = true, message = "Kahraman Başarıyla Eklendi.", hero = hero });
            }
            catch (Exception e)
            {
                // Hata mesajı loglanabilir veya uygun bir şekilde işlenebilir
                return InternalServerError(e);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateHeroStats([FromBody] HeroBody heroBody)
        {
            try
            {
                _heroService = new HeroService();
                var hero = _heroService.UpdateHeroStats(heroBody.HeroId, heroBody.HeroLevel);
                return Ok(new { success = true, message = "Kahraman Başarıyla Güncellendi." ,hero=hero });
            }
            catch (Exception e)
            {
                // Hata mesajı loglanabilir veya uygun bir şekilde işlenebilir
                return InternalServerError(e);
            }
        }
    }
}