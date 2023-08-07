using System;
using System.Security.Claims;

namespace EscuelaBaile.Services
{
	public interface IPackagesService
	{
		bool ExistPackage(int name);
	}

    public class PackagesService : IPackagesService
    {
        private readonly ApplicationDbContext context;
        

        public PackagesService(ApplicationDbContext context)
        {
            
            this.context = context;
        }

        public bool ExistPackage(int name)
        {
           // var nameCode = Int32.Parse(name);

            var existPackage = context.Packages.Any(p => p.PackageCode == name);

            return existPackage;
          
            
        }
    }
}

