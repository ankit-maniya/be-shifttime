"use strict"

/*** Third Party Packages ***/
import express from 'express';

/*** Global ***/
import utils from '../global/index.js'

/*** Controllers ***/
import { user, availability, category, bookoff, shift, email, stripe, conversation } from '../controllers/index.js'

/*** Middleware ***/
import { me } from '../middlewares/index.js'

const routes = express.Router()

/*** TEST ***/
routes.get('/', (req, res) => utils.sendSuccess(res, 200, { label: 'Api Working Fine!!' }))

/*** USER ***/
routes.get('/users', user.getAll)
routes.get('/users/:userId', user.get)
routes.post('/users/signup', user.create)
routes.post('/users/login', user.login)
routes.put('/users/:userId', me, user.update)
routes.delete('/users/:userId', me, user.delete)

/*** AVAILABILITY ***/
routes.get('/availability', availability.getAll)
routes.get('/availability/:availibilityId', availability.get)
routes.post('/availability/create', availability.create)
routes.put('/availability/:availibilityId', me, availability.update)
routes.delete('/availability/:availibilityId', me, availability.delete)

/*** CATEGORY ***/
routes.get('/category', category.getAll)
routes.get('/category/:categoryId', category.get)
routes.post('/category/create', category.create)
routes.put('/category/:categoryId', me, category.update)
routes.delete('/category/:categoryId', me, category.delete)

/*** BOOK-OFF ***/
routes.get('/bookoff', bookoff.getAll)
routes.get('/bookoff/:bookOffId', bookoff.get)
routes.post('/bookoff/create', bookoff.create)
routes.put('/bookoff/:bookOffId', me, bookoff.update)
routes.delete('/bookoff/:bookOffId', me, bookoff.delete)

/*** SHIFT ***/
routes.get('/shift', shift.getAll)
routes.get('/shift/datewise', shift.getAllShiftsForDate)
routes.get('/shift/schedule-datewise', shift.getAllShiftsScheduleForDate)
routes.get('/shift/schedule-weekwise', shift.getAllShiftsForWeek)
routes.get('/shift/employeewise', shift.getAllShiftsForEmployee)
routes.get('/shift/:shiftId', shift.get)
routes.post('/shift/create', shift.create)
routes.put('/shift/:shiftId', me, shift.update)
routes.delete('/shift/:shiftId', me, shift.delete)

/*** EMAIL ***/
routes.post('/email/shiftcreated', email.sendShiftCreatedEmail)
routes.post('/email/bookoffupdate', email.sendBookOffStatusChangedEmail)
routes.post('/email/availabilityupdate', email.sendAvailabilityStatusChangedEmail)
routes.post('/email/sentshiftdetails', email.sendShiftListToEmployee)

/*** STRIPE ***/
routes.get('/stripe/products', stripe.getAllProducts)
routes.get('/stripe/customer/subscriptions', stripe.getAllSubscriptionsOfCustomer)
routes.get('/stripe/customer/invoices', stripe.getAllInvoicesOfCustomer)
routes.get('/stripe/customer/activeplan', stripe.getCurrentActivePlanOfCustomer)
routes.post('/stripe/checkout', stripe.checkoutProduct)
routes.post('/stripe/customer', stripe.createCustomer)

/*** CONVERSATION ***/
routes.get('/conversation', conversation.getAll)
routes.get('/conversation/:conversationId', conversation.get)
routes.post('/conversation/create', conversation.create)
routes.put('/conversation/:conversationId', me, conversation.update)
routes.delete('/conversation/:conversationId', me, conversation.delete)

/*** REPORT ***/
routes.get('/stripe/balance', stripe.gatBalance);

export default routes