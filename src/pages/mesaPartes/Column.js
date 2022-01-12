import { Tag } from 'antd';

export const columnas = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    render: (id) => <p>{id.substring(-1, 7)}</p>,
  },
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
  },
  {
    title: 'Apellidos',
    dataIndex: ['ap_materno', 'ap_paterno'],
    key: 'apellidos',
    render: (text, record) => (
      <p key={Math.random().toString()}>
        {record.ap_paterno} {record.ap_materno}
      </p>
    ),
  },
  {
    title: 'Tipo de Documento',
    dataIndex: ['tipoDoc', 'nro_documento'],
    key: 'tipoDoc',
    render: (text, record) => (
      <p key={Math.random().toString()}>
        <Tag
          style={{
            background: record.tipoDoc === 'dni' ? '#B7D891' : '#A5CDDA',
          }}
        >
          {record.tipoDoc.toUpperCase()}:
        </Tag>{' '}
        {record.nro_documento}
      </p>
    ),
  },
  {
    title: 'Teléfono',
    dataIndex: 'telefono',
    key: 'telefono',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    render: (email) => (
      <p style={{ textAlign: 'center' }}>{email ? email : '-----------'}</p>
    ),
  },
  {
    title: 'Dirección',
    dataIndex: 'direccion',
    key: 'direccion',
  },
  {
    title: 'Fecha',
    dataIndex: 'createdAt',
    key: 'fecha',
    render: (fecha) => <p>{fecha.substring(0, 10)}</p>,
  },
  {
    title: 'Acciones',
    dataIndex: 'file',
    key: 'file',
    render: (file) => (
      <a href={file} target="_blank">
        Ver más
      </a>
    ),
  },
];
