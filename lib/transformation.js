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
  },

  transformInsTextRemoveText: (op1, op2, side) => {
    const pathCompare = Path.compare(op1.path, op2.path);
    if (pathCompare === 0) {
      const op1StartPoint = op1.offset;

      const op2Len = op2.text.length;
      const op2StartPoint = op2.offset;
      const op2EndPoint = op2StartPoint + op2Len;

      if (op1StartPoint <= op2StartPoint) {
        return op1;
      }

      if (op1StartPoint >= op2EndPoint) {
        return {
          ...op1,
          offset: op1StartPoint - op2Len
        }
      }

      return {
        ...op1,
        offset: op1StartPoint - op2StartPoint + op1StartPoint
      }

    }
    return op1;
  }
};

module.exports = { Transform };
