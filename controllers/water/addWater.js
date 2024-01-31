const { Water } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const addWater = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { waterVolume, time } = req.body;
	const newTime = new Date(time).toLocaleTimeString();
	const date = new Date().toDateString();


	const filter = { owner, date: date };

	const searchfordate = await Water.findOne(filter);
	if (!searchfordate) {

		await Water.create({
			owner,
			date,
			dailyNorma,
			drankWater: waterVolume,
			perDay: 1,
			waterlist: [{ waterVolume: waterVolume, time: newTime, id: uuidv4() }],
		});

		res.status(201).json({
			status: "success",
			waterVolume,
			newTime,
		});

	} else {

		await Water.findOneAndUpdate(filter,
			{
				$inc: { perDay: +1, drankWater: +waterVolume },
				$push: { waterlist: { waterVolume: waterVolume, time: time, id: uuidv4() } },
			},
			{ new: true })

		res.status(201).json({
			status: "success",
			waterVolume,
			newTime
		});
	}
};

module.exports = addWater;
