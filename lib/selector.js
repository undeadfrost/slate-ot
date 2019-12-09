const OperationTypes = require('./operationTypes');
const { Transform } = require('./transformation');

const Selector = {
  transform: (op1, op2, side) => {
    const op = Selector._transform(op1, op2, side);
    return op;
  },

  _transform: (op1, op2, side) => {
    if (op1.type === OperationTypes.INSERT_TEXT) {
      if (op2.type === OperationTypes.INSERT_TEXT) {
        return Transform.transformInsTextInsText(op1, op2 ,side);
      }
    }
  }
};

module.exports = Selector;


