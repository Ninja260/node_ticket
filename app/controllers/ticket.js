const ticketService = require('../services/ticket');
const { matchedData } = require("express-validator");
const resultJson = require('../utils/resultJson');
const checkPermission = require('../utils/checkPermission');
const Permission = require('../constants/permission');
const jsonMessage = require('../utils/jsonMessage');

exports.getList = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.LIST);
        const { type, search } = matchedData(req);
        const result = await ticketService.getList(type, search, req.user);

        res.json(resultJson(result));
    } catch (err) {
        console.log(err.message);
        next(err);
    }

};

exports.getById = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.VIEW);
        const { id } = matchedData(req);
        const result = await ticketService.getById(id);

        res.json(resultJson(result));
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

exports.getLogs = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.VIEW);
        const { id } = matchedData(req);
        const result = await ticketService.getLogs(id);

        res.json(resultJson(result));
    } catch (err) {
        console.log(err.message);
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.CREATE);
        const ticket = matchedData(req);
        ticket.issuer_id = req.user._id;
        await ticketService.create(ticket, req.user);

        res.status(201)
        .json(jsonMessage("Ticket Successfully created!"));
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

exports.edit = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.EDIT);
        const ticket = matchedData(req);
        await ticketService.edit(ticket, req.user);

        res.json(jsonMessage('Ticket Successfully saved!'));
    } catch(err) {
        console.log(err.message);
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.DELETE);
        const { id } = matchedData(req);
        await ticketService.delete(id);

        res.json(jsonMessage('Ticket deleted!'));
    } catch(err) {
        console.log(err.message);
        next(err);
    }
}

exports.approve = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.APPROVE);
        const { id } = matchedData(req);
        await ticketService.approve(id, req.user);

        res.json(jsonMessage( 'Ticket Approved!'));
    } catch(err) {
        console.log(err.message);
        next(err);
    }
};

exports.inquire = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.TICKET.INQUIRE);
        const { id } = matchedData(req);
        await ticketService.inquire(id, req.user);

        res.json(jsonMessage('Ticket Inquired!'));
    } catch(err) {
        console.log(err.message);
        next(err);
    }
};