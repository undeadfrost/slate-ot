import React, { useState, useMemo, useEffect } from 'react';
import { Editor, createEditor, Path } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import ShareDB from 'sharedb/lib/client';
import uuid4 from 'uuid/v4';
import slateType from '../lib/type';

ShareDB.types.register(slateType.type);

const socket = new WebSocket('ws://localhost:9000');
const connection = new ShareDB.Connection(socket);
const doc = connection.get('examples', 'richText');
const op = { type: "insert_text", path: [0, 0, 0], offset: 16, text: "1" };

const withApply = (editor) => {
  const { apply } = editor;
  editor.apply = operator => {
    apply(operator);
    if (operator.type !== 'set_selection') {
      console.log(operator);
      doc.submitOp(operator);
    }
  };
  return editor;
};

function App() {
  const [value, setValue] = useState();
  const [uuid, setUuid] = useState(uuid4());
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
  }, [editor]);

  const onChange = (children, operations) => {
    operations.forEach(op => {
      if (op.type !== 'set_selection' && !op.data) {
        console.log(op);
        doc.submitOp({ ...op, data: { source: uuid } });
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
