// JSHint - TODO
/* jshint asi: true */

(function() {"use strict"})()

// Config.gs
// =========
//
// Library for managing the configuration values.
//
// External interface to this script - all of the event handlers.
//
// This files contains all of the event handlers, plus miscellaneous functions 
// not worthy of their own files yet
//
// The filename is prepended with _API as the Github chrome extension won't 
// push a file with the same name as the project.

var Log_

// Public event handlers
// ---------------------
//
// All external event handlers need to be top-level function calls; they can't 
// be part of an object, and to ensure they are all processed similarily 
// for things like logging and error handling, they all go through 
// errorHandler_(). These can be called from custom menus, web apps, 
// triggers, etc
// 
// The main functionality of a call is in a function with the same name but 
// post-fixed with an underscore (to indicate it is private to the script)
//
// For debug, rather than production builds, lower level functions are exposed
// in the menu

var EVENT_HANDLERS_ = {

//                           Name                            onError Message                          Main Functionality
//                           ----                            ---------------                          ------------------

  initialise:                ['initialise()',                'Failed to initialise',                  initialise_],
  get:                       ['get()',                       'Failed to get',                         get_],
  set:                       ['set()',                       'Failed to set',                         set_],
}

function initialise(args) {return eventHandler_(EVENT_HANDLERS_.initialise, args)}
function get(args)        {return eventHandler_(EVENT_HANDLERS_.get, args)}
function set(args)        {return eventHandler_(EVENT_HANDLERS_.set, args)}

// Private Functions
// =================

// General
// -------

/**
 * All external function calls should call this to ensure standard 
 * processing - logging, errors, etc - is always done.
 *
 * @param {Array} config:
 *   [0] {Function} prefunction
 *   [1] {String} eventName
 *   [2] {String} onErrorMessage
 *   [3] {Function} mainFunction
 *
 * @param {Object}   arg1       The argument passed to the top-level event handler
 */

function eventHandler_(config, args) {

    var userEmail = Session.getActiveUser().getEmail()
    var sendErrorEmail = userEmail ? SEND_ERROR_EMAIL_ : false 

    Log_ = BBLog.getLog({
      level:                DEBUG_LOG_LEVEL_, 
      displayFunctionNames: DEBUG_LOG_DISPLAY_FUNCTION_NAMES_,
      sheetId:              LOG_SHEET_ID_,
    })
        
    Log_.info('Handling ' + config[0] + ' from ' + (userEmail || 'unknown email') + ' (' + SCRIPT_NAME + ' ' + SCRIPT_VERSION + ')')
    
    // Call the main function
    return config[2](args)
    
} // eventHandler_()

// Private event handlers
// ----------------------

/**
 * Store the id of the spreadsheet along with the email of the user
 *
 * @param {object} 
 *   {string} email
 *   {string} spreadsheetId
 *
 * @return {object}
 */

function initialise_(config) {

  Log_.functionEntryPoint()
  var callingfunction = 'initialise_'
  
  var email = config.email
  Assert.assertDefined(email, callingfunction, 'No email provided')
  Assert.assertString(email, callingfunction, 'Email not a string')
  Assert.assert(email !== '', callingfunction, 'Empty email address')
  
  var spreadsheetId = config.spreadsheetId
  Assert.assertDefined(spreadsheetId, callingfunction, 'No spreadsheet ID provided')
  
  Store
    .getStore({
      name       : LOOOKUP_TABLE_NAME_,
      properties : PropertiesService.getScriptProperties(),
      lock       : LockService.getScriptLock(),
      log        : Log_,
      createNew  : false,
    })
    .setProperty(email, spreadsheetId)
    
  SpreadsheetApp.getUi().alert(email + ' associated with config sheet "' + spreadsheetId + '"')

} // Config.initialise() 

/**
 * Set a config value
 *
 * @param {object} 
 *   {string} key
 *   {object} value
 *
 * @return {object}
 */
 
function set_() {

  Log_.functionEntryPoint()
  var callingfunction = 'set_()'
/*  
  Assert.assertDefined(key, callingfunction, 'No config key provided')
   
  var email = Session.getActiveUser().getEmail()
  
  var configSheetId = Store
    .getStore({
      name       : LOOOKUP_TABLE_NAME_,
      properties : PropertiesService.getScriptProperties(),
      log        : Log_,      
      lock       : LockService.getScriptLock(),
      createNew  : false,
    })
    .getProperty(email)
    
  Assert.assertNotNull(configSheetId, callingfunction, 'Run setup before trying to get values')
  
  var configSpreadsheet = SpreadsheetApp.openById(configSheetId)
  Assert.assertNotNull(configSpreadsheet, callingfunction, 'Can not open config GSheet')
  var configSheet = configSpreadsheet.getSheetByName(CONFIG_SHEET_NAME_)
  var allValues = configSheet.getSheetValues(2, 1, configSheet.getLastRow() - 1, 2) 
  var value = null

  allValues.some(function(row) {
    if (row[0] === key) {
      value = row[1]
      return true
    }
  })
  
  Log_.info(email + ' got ' + value + ' from ' + configSheetId)
  return value
*/  
} // set_() 

/**
 * Get a configuration value
 *
 * @param {string} key
 *
 * @return {string} value or null
 */
 
function get_(key) {

  Log_.functionEntryPoint()
  var callingfunction = 'get_()'
  
  Assert.assertDefined(key, callingfunction, 'No config key provided')
   
  var email = Session.getActiveUser().getEmail()
  
  var configSheetId = Store
    .getStore({
      name       : LOOOKUP_TABLE_NAME_,
      properties : PropertiesService.getScriptProperties(),
      log        : Log_,      
      lock       : LockService.getScriptLock(),
      createNew  : false,
    })
    .getProperty(email)
    
  Assert.assertNotNull(configSheetId, callingfunction, 'Run setup on config sheet before trying to get values')
  
  var configSpreadsheet = SpreadsheetApp.openById(configSheetId)
  Assert.assertNotNull(configSpreadsheet, callingfunction, 'Can not open config GSheet')
  var configSheet = configSpreadsheet.getSheetByName(CONFIG_SHEET_NAME_)
  var allValues = configSheet.getSheetValues(2, 1, configSheet.getLastRow() - 1, 2) 
  var value = null

  allValues.some(function(row) {
    if (row[0] === key) {
      value = row[1]
      return true
    }
  })
  
  Log_.info(email + ' got ' + value + ' from ' + configSheetId)
  return value

} // Config.get_() 