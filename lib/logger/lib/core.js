/**
 * @file logger Core
 * @author Dennis Yalint
 */
'use strict';

var EventEmitter = require('events').EventEmitter;

var logger = module.exports = new EventEmitter();
logger.Connection = require('./connection');
