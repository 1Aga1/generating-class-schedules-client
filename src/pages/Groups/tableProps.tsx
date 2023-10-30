import {ColumnsType} from "antd/es/table";
import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export interface ITableDataType {
    key: number,
    name: string,
    subjects: {
        id: number
        subject: {
            id: number,
            name: string,
        }
    }[]
}

export const getColumns = (
    onEdit: (id: number) => void,
    onRemove: (id: number) => void
) => {
    return [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Предметы',
            dataIndex: 'subjects',
            key: 'subjects',
            render: (_, {subjects}) => {
                return subjects && subjects.length > 0 ? <>
                    {subjects.map(item => (
                        <div key={item.subject.id}>{item.subject.name}</div>
                    ))}
                </> : ''
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button onClick={() => onEdit(record.key)} icon={<EditOutlined/>}></Button>
                    <Button danger type='primary' onClick={() => onRemove(record.key)} icon={<DeleteOutlined/>}></Button>
                </Space>
            ),
        },
    ] as ColumnsType<ITableDataType>
}
