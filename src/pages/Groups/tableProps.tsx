import {ColumnsType} from "antd/es/table";
import {Button, Space} from "antd";
import dayjs from "dayjs";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export interface ITableDataType {
    key: number,
    name: string,
    level: string,
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
                title: 'Уровень подготовки',
                dataIndex: 'level',
                key: 'level',
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
