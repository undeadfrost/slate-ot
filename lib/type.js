const { createEditor } = require('slate');
const Selector = require('./selector');

const slateType = {
  type: {
    name: 'slate-ot-type',
    uri: 'http://sharejs.org/types/slate-ot-type',
    create: (initialData) => {
      console.log('called create in SlateType');
      console.log(JSON.stringify(initialData));
      return initialData;
    },
    apply: (snapshot, op) => {
      const editor = createEditor();
      editor.children = snapshot;
      editor.apply(op);
      return editor.children;
    },
    transform: (op1, op2, side) => {
      console.log('op1', op1);
      console.log('op2', op2);
      console.log('side', side);
      return Selector.transform(op1, op2, side);
    }
  }
};

module.exports = slateType;
