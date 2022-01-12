import { DownloadOutlined } from '@ant-design/icons';

export const columns = [
  {
    title: 'Año',
    dataIndex: 'year',
    key: 'year',

    filters: [
      {
        text: '2018',
        value: 2018,
      },
      {
        text: '2019',
        value: 2019,
      },
      {
        text: '2020',
        value: 2020,
      },
      {
        text: '2021',
        value: 2021,
      },
      {
        text: '2022',
        value: 2022,
      },
    ],
    onFilter: (value, record) => record.year === value,
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ver',
    dataIndex: 'file',
    key: 'file',
    render: (file) => (
      <a
        href={file}
        target="_blank"
        style={{
          border: '1px solid #333',
          borderRadius: '50%',
          padding: '5px 6px',
          margin: '0',
        }}
      >
        <DownloadOutlined />
      </a>
    ),
  },
];
