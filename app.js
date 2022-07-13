const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
    await db.sequelize.sync({ force: true });
  
    try {
      const movie = await Movie.create({
        title: 'Toy Story',
        runtime: 81,
        releaseDate: '1995-11-22',
        isAvailableOnVHS: true,
      });
      console.log(movie.toJSON());
  
      const movie2 = await Movie.create({
        title: 'The Incredibles',
        runtime: 115,
        releaseDate: '2004-04-14',
        isAvailableOnVHS: true,
      });
      console.log(movie2.toJSON());

      const person = await Person.create({
        firstName: 'Alec',
        lastName: 'Baldwin',
      });
      console.log(person.toJSON());
  
      const person2 = await Person.create({
        firstName: 'Tom',
        lastName: 'Cruise',
      });
      console.log(person2.toJSON());
//build creates without saving to the database
      const movie3 = await Movie.build({
          title: 'Toy Story 3',
          runtime: 103,
          releaseDate: '2010-06-18',
          isAvailableOnVHS: false,
      })
//saves the build 
      await movie3.save();
      console.log(movie3.toJSON());

      const movieByID = await Movie.findByPk(1);
        console.log(movieByID.toJSON());

        const movieByRuntime = await Movie.findOne({ where: { runtime: 115 }});
            console.log(movieByRuntime.toJSON());
//finding and printing specific attributes under specific where criteria
        const movies = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                releaseDate: {
                [Op.gte]: '2004-01-01',
                },
                runtime: {
                    [Op.gte]: 95,
                },
            },
        });
            console.log(movies.map(movie=> movie.toJSON()));
            //updating a record
            const toyStory3 = await Movie.findByPk(3);
            toyStory3.isAvailableOnVHS = true;
            await toyStory3.save();
        
            console.log( toyStory3.get({ plain: true }) );
  
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(err => err.message);
          console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
      }
    })();