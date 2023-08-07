using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EscuelaBaile.Entities;
using EscuelaBaile.Models;
using EscuelaBaile.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EscuelaBaile.Controllers
{
    [Route("api/packages")]
    public class ApiPackageController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IPackagesService packagesService;

        public ApiPackageController(ApplicationDbContext context, IPackagesService packagesService)
        {
            this.context = context;
            this.packagesService = packagesService;
        }



        //CREATE
        [HttpPost]
        public async Task<ActionResult<Package>> Post([FromBody] Package newPackage)
        {

            

                var existPackage = packagesService.ExistPackage(newPackage.PackageCode);

                if (!existPackage)
                {
                    newPackage = new Package
                    {
                        PackageCode = newPackage.PackageCode,

                        Price = newPackage.Price

                    };

                    

                     context.Add(newPackage);

                     await context.SaveChangesAsync();

                     return Ok();


                 }


            return Ok();
        }


        // SHOW PACKAGE LIST
        [HttpGet]
        public async Task<List<Package>> Get()
        {

            
           return await context.Packages.ToListAsync();
        }


        // GET PACKAGE TO EDIT
        [HttpGet("{name:int}")]
        public async Task<ActionResult<Package>> Get(int name)
        {
            var package = await context.Packages.FirstOrDefaultAsync(p => p.PackageCode == name);

            if (package is null)
            {
                return NotFound();
            }

            return package;
        }

        
        // EDIT PACKAGE
        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditPackage(int id, [FromBody] EditPackageDTO editPackageDTO)
        {
            var package = await context.Packages.FirstOrDefaultAsync(p => p.Id == id);

            if (package is null)
            {
                return NotFound();
            }

            package.PackageCode = editPackageDTO.Name;
            package.Price = editPackageDTO.Price;

            await context.SaveChangesAsync();

            return Ok();
        }


        // DELETE PACKAGE
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var package = await context.Packages.FirstOrDefaultAsync(p => p.Id == id);

            if (package is null)
            {
                return NotFound();
            }

            context.Remove(package);

            await context.SaveChangesAsync();

            return Ok();
        }

    }
}

