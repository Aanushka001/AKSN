const Booking = require('../models/bookingModel');
const ParkingSpace = require('../models/parkingSpaceModel');

exports.createBooking = async (req, res) => {
  try {
    const { parkingSpaceId, startTime, endTime, vehicleType } = req.body;
    const userId = req.user.id;

    // Check if the parking space exists and has available spots
    const parkingSpace = await ParkingSpace.findById(parkingSpaceId);
    if (!parkingSpace) {
      return res.status(404).json({ message: 'Parking space not found' });
    }

    const availableSpots = vehicleType === '2wheeler' 
      ? parkingSpace.no_of_2_wheeler_parking 
      : parkingSpace.no_of_4_wheeler_parking;

    if (availableSpots <= 0) {
      return res.status(400).json({ message: 'No available parking spots' });
    }

    // Create the booking
    const newBooking = new Booking({
      user: userId,
      parkingSpace: parkingSpaceId,
      startTime,
      endTime,
      vehicleType
    });

    await newBooking.save();

    // Update available spots
    if (vehicleType === '2wheeler') {
      parkingSpace.no_of_2_wheeler_parking -= 1;
    } else {
      parkingSpace.no_of_4_wheeler_parking -= 1;
    }
    await parkingSpace.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate('parkingSpace');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};