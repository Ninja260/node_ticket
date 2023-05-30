const express = require('express');
const router = express.Router();
const ticketController = require('../../../controllers/ticket');
const { listQueryValidator, idUrlSegmentValidator, bodyPayloadValidator} = require('../middleware/ticketValidator');

router.get('/', listQueryValidator, ticketController.getList);

router.get('/:id', idUrlSegmentValidator, ticketController.getById);

router.get('/:id/log', idUrlSegmentValidator, ticketController.getLogs);

router.post('/', bodyPayloadValidator, ticketController.create);

router.put('/:id', idUrlSegmentValidator, bodyPayloadValidator, ticketController.edit);

router.post('/:id/approve', idUrlSegmentValidator, ticketController.approve);

router.post('/:id/inquire', idUrlSegmentValidator, ticketController.inquire);

router.delete('/:id', idUrlSegmentValidator, ticketController.delete);

module.exports = router;