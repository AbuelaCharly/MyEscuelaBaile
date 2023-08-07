using System;
using System.Xml;
using EscuelaBaile.Entities;
using Microsoft.EntityFrameworkCore;


namespace EscuelaBaile
{
	public class ApplicationDbContext: DbContext
	{
		public ApplicationDbContext(DbContextOptions options): base(options)
		{

		}


        protected override void OnModelCreating(ModelBuilder modelBuilder)// Crée la migration
        {
            modelBuilder.Entity<Package>().Property(p => p.Price).HasColumnType("decimal(18,2)");

        }

        //API FLUENT
        /*    protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<User>().Property(u => u.Name).IsRequired();

                modelBuilder.Entity<User>().Property(u => u.Surname).IsRequired();

                modelBuilder.Entity<User>().Property(u => u.LessonsDone).IsRequired();





            } */

        // public DbSet<User> Users { get; set; }

        public DbSet<Package> Packages { get; set; }

        public DbSet<TeachersList> TeachersLists { get; set; }

    }
}

