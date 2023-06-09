import {ColumnsType} from "antd/es/table";
import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export interface ITableDataType {
    key: number,
    fullname: string,
}

export const getColumns = (
    onEdit: (id: number) => void,
    onRemove: (id: number) => void
) => {
    return [
            {
                title: 'ФИО',
                dataIndex: 'fullname',
                key: 'fullname',
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
