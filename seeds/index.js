const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB Connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60ddd458e9c57d2014214d11',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem aliquid harum necessitatibus non eum quis, explicabo voluptas pariatur incidunt ad ea nobis laudantium earum laboriosam minima illo reprehenderit cupiditate possimus!',
            price: price,
            geometry: {
                type:'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcs15hip9/image/upload/v1625230388/YelpCamp/qleba1hfwussyyrzidz3.jpg',
                    filename: 'YelpCamp/qleba1hfwussyyrzidz3'
                },
                {
                    url: 'https://res.cloudinary.com/dcs15hip9/image/upload/v1625230388/YelpCamp/n9enyynesuuvqcfilv8o.jpg',
                    filename: 'YelpCamp/n9enyynesuuvqcfilv8o'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

