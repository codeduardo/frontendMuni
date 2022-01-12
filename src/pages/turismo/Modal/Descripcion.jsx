import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Emoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';

Quill.register('modules/emoji', Emoji);

const Descripcion = ({ desc, valueInitial }) => {
  const [value, setValue] = useState('');
  const sendDescription = () => {
    console.log(value);
    desc(value);
  };

  const handleChange = (value) => {
    setValue(value);
  };
  useEffect(() => {
    setValue(valueInitial ? valueInitial.description : '');
  }, []);

  return (
    <>
      <Row align="end">
        <Col span={3}>
          <Button
            onClick={sendDescription}
            style={{
              position: 'relative',
              top: '37px',
            }}
            type="link"
          >
            Hecho
          </Button>
        </Col>
      </Row>
      <ReactQuill
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'emoji'],
          ],
          'emoji-toolbar': true,
          'emoji-textarea': false,
          'emoji-shortname': true,
        }}
        value={value}
        onChange={handleChange}
        style={{ height: '500px' }}
      />
    </>
  );
};

export default Descripcion;
