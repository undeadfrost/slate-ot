const { Path } = require('slate');

const Transform = {
  transformInsTextInsText: (op1, op2, side) => {
    const pathCompare = Path.compare(op1.path, op2.path);
    if (pathCompare === 0) {
      if (op1.offset < op2.offset || (op1.offset === op2.offset && side === 'left')) {
        return op1;
      } else {
        return { ...op1, offset: op1.offset + op2.text.length };
      }
    } else {
      return op1;
    }
  }
};

module.exports = { Transform };
