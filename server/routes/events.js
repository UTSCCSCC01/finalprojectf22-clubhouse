import express from 'express';

const EventsRouter = express.Router;

router.get('/', (req, res) => {
    res.send("This works");
});

export default EventsRouter;