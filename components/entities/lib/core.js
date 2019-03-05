/**
 * @file Entities Core
 * @author Dennis Yalint
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var entities = module.exports = new EventEmitter();
entities.db = require('./db');
