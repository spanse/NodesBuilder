Hello! This is a personal project, nothing secret about it, but if you're looking for something useful or interesting, 
i'm afraid this is the wrong project!


TODO:
Create database tools library
Create example user register/login system
Create comments system
Create blog post import system
Create calendar system, or look into existing ones
Change from session memorystore to sql store (https://www.npmjs.com/package/connect-mssql)


COMPLETED:
Setup database connection
Deploy on web-server (note, url: melucky.ca, hosted on living room server, launch batch file to setup & launch node server)
Migrate from .jade to .pug, or change to pure HTML.
Migrate from .styl to .sass

TASKS:
Implement error catching for all query functions
Add ability to create tables
	Specify: 
		Name
		Type (number, string, date)
Add ability to view created tables
	From selectable list
Add ability to add new records to created tables
	Will need to get column name, data type, will need to standardise validation (string length, number length, etc.)
Add ability to delete records from created tables
Add ability to edit records from created tables