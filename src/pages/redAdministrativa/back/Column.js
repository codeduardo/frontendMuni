import ModalDelete from '../Modal/ModalDelete';

export const columns = [
  {
    title: 'NOMBRES COMPLETOS',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (fullName) => (
      <p
        style={{
          fontWeight: '500',
          color: 'var(--color-azul)',
          textTransform: 'capitalize',
        }}
      >
        {fullName}
      </p>
    ),
  },
  {
    title: 'ROL',
    dataIndex: 'rol',
    key: '_id',
    render: (rol) => (
      <p style={{ fontWeight: '700', color: 'var(--color-verde)' }}>
        {rol.toUpperCase()}
      </p>
    ),
  },
  {
    title: 'PROFESION',
    dataIndex: 'profesion',
    key: '_id',
    render: (profesion) => (
      <p style={{ textTransform: 'capitalize' }}>{profesion}</p>
    ),
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email',
    render: (email) => <p style={{ color: 'var(--color-azul)' }}>{email}</p>,
  },
  {
    title: 'Borrar',
    dataIndex: '_id',
    key: 'actions',

    render: (id) => {
      return <ModalDelete idColaborador={id} />;
    },
  },
];
