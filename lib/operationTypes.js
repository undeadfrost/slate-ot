const OperationTypes = {
  INSERT_TEXT: 'insert_text',
  REMOVE_TEXT: 'remove_text',
  /**
   * These operations we can actually omit
   */
  SET_SELECTION: 'set_selection',
  SET_VALUE: 'set_value',
};

module.exports = OperationTypes;
