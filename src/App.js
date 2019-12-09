import React, { useState, useMemo, useEffect } from 'react';
import { Editor, createEditor, Path } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import ShareDB from 'sharedb/lib/client';
import slateType from '../lib/type';

ShareDB.types.register(slateType.type);

const socket = new WebSocket('ws://localhost:9000');
const connection = new ShareDB.Connection(socket);
const doc = connection.get('examples', 'richText');

function App() {
  const [value, setValue] = useState();
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    doc.subscribe(err => {
      setValue(doc.data);
    });
  }, []);

  useEffect(() => {
    doc.on('op', (op, source) => {
      if (!source) {
        editor.apply(op);
      }
    });
  });

  setTimeout(() => {
    // eslint-disable-next-line no-unused-expressions
    editor.apply({ type: 'insert_text', path: [0, 0, 0], offset: 5, text: '@' }), 5000
  });

  const onChange = (children, operations) => {
    operations.forEach(op => {
      if (op.type !== 'set_selection') {
        console.log(op);
        doc.submitOp(op);
      }
    })
  };

  return (
    <div>
      {
        value
          ? <Slate editor={editor} defaultValue={value} onChange={onChange}>
            <Editable/>
          </Slate>
          : <p>Loading...</p>
      }
    </div>

  );
}

export default App;
