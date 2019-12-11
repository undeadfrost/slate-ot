const OperationTypes = require('./operationTypes');
const { Transform } = require('./transformation');

const Selector = {
  transform: (op1, op2, side) => {
    return Selector._transform(op1, op2, side);
  },

  _transform: (op1, op2, side) => {
    if (op1.type === OperationTypes.INSERT_TEXT) {
      if (op2.type === OperationTypes.INSERT_TEXT) {
        return Transform.transformInsTextInsText(op1, op2 ,side);
      } else if (op2.type === OperationTypes.REMOVE_TEXT) {
        return Transform.transformInsTextRemoveText(op1, op2, side);
      }
    }
  }
};

module.exports = Selector;


