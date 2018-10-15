// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

(function() {"use strict"})()

// Code review all files - TODO
// JSHint review (see files) - TODO
// Unit Tests - TODO
// System Test (Dev) - TODO
// System Test (Prod) - TODO

// Config.gs
// =========
//
// Dev: AndrewRoberts.net
//
// All the constants and configuration settings

// Configuration
// =============

var SCRIPT_NAME = "Config"
var SCRIPT_VERSION = "v1.2.dev_ajr"

var PRODUCTION_VERSION_ = true

// Log Library
// -----------

var DEBUG_LOG_LEVEL_ = PRODUCTION_VERSION_ ? BBLog.Level.INFO : BBLog.Level.FINER
var DEBUG_LOG_DISPLAY_FUNCTION_NAMES_ = PRODUCTION_VERSION_ ? BBLog.DisplayFunctionNames.NO : BBLog.DisplayFunctionNames.YES

var LOG_SHEET_ID_ = '1jDRHqG5dNr7_9qwYvdiTETNA-shJaHLuES_kaZXJT7w' // Config Master Log
// var LOG_SHEET_ID_ = '1VmbQwP1CBMkQCom2wrHRQQZ3qUl2icd9FKdjXXjOE0k' // Config Test Sheet

// Assert library
// --------------

var SEND_ERROR_EMAIL_ = PRODUCTION_VERSION_ ? true : false
var HANDLE_ERROR_ = Assert.HandleError.THROW
var ADMIN_EMAIL_ADDRESS_ = ''

// Constants/Enums
// ===============

var LOOOKUP_TABLE_NAME_ = 'configUsers'

var PROPERTY_USERS_ = SCRIPT_NAME + '_USERS'
var PROPERTY_CONFIG_SHEET_ID_ = SCRIPT_NAME + '_CONFIG_SHEET_ID'

var CONFIG_SHEET_NAME_ = 'Config'

// Function Template
// -----------------

/**
 *
 *
 * @param {object} 
 *
 * @return {object}
 */
/* 
function functionTemplate() {

  Log_.functionEntryPoint()
  
  

} // functionTemplate() 
*/