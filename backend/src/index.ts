import express from 'express';
import cors from 'cors';
import { ownerRouter } from './routes/owner.js';
import { eventTypesRouter } from './routes/eventTypes.js';
import { slotsRouter } from './routes/slots.js';
import { bookingsRouter } from './routes/bookings.js';

const app = express();
const PORT = 4010;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
}));
app.use(express.json());

app.use('/owner', ownerRouter);
app.use('/event-types', eventTypesRouter);
app.use('/event-types/:eventTypeId/slots', slotsRouter);
app.use('/bookings', bookingsRouter);

app.listen(PORT, () => {
  console.log(`Booking API running on http://localhost:${PORT}`);
});
