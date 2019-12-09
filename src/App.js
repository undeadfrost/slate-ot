import React, { useState, useMemo, useEffect } from 'react';
import { Editor, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import ShareDB from 'sharedb/lib/client';

const socket = new WebSocket('ws://localhost:9000');
const connection = new ShareDB.Connection(socket);
const doc = connection.get('examples', 'counter');

const defaultValue = [
  {
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'A line of text!',
            marks: [],
          },
        ],
      },
    ],
  }
];


function App() {
  const [value, setValue] = useState();
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    doc.subscribe(err => {
      setValue(doc.data);
    });
  }, []);

  const onChange = (children, operations) => {
    console.log('operations', operations);
    operations.forEach(op => {
      if (op.type !== 'set_selection') {
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
