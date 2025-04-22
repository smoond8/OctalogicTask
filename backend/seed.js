const sequelize = require('./src/conn/dbconnection'); 
const { CarType, BikeType, Vehicle } = require('./src/model'); 


const seed = async () => {
    try {
      await sequelize.sync({ force: true }); 
  
     
      const carTypes = await CarType.bulkCreate([
        { name: 'Hatchback' },
        { name: 'SUV' },
        { name: 'Sedan' },
      ]);
  
   
      const bikeType = await BikeType.create({ name: 'Cruiser' });
  
  
      // Seed vehicles
      await Vehicle.bulkCreate([
        { name: 'firstCar', CarId: carTypes[0].id },
        { name: 'secondCar', CarId: carTypes[1].id },
        { name: 'thirdCar', CarId: carTypes[2].id },
        { name: 'firstBike', BikeId: bikeType.id },
      ]);
  
      
      console.log('seed successfully');
      process.exit(0);
    } catch (error) {
      console.error('failed in seeding:', error);
      process.exit(1);
    }
  };
  
  seed();