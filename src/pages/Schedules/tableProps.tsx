import {ColumnsType} from "antd/es/table";
import {Button, Space, Tooltip} from "antd";
import dayjs from "dayjs";
import {DeleteOutlined, DownloadOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export interface ITableDataType {
    key: number,
    date: any,
}

export const getColumns = (
    onEdit: (id: number) => void,
    onRemove: (id: number) => void,
    onDownload: (id: number) => void,
) => {
    return [
            {
                title: 'Дата',
                dataIndex: 'date',
                key: 'date',
                render: (_, record) => {
                    return (
                        dayjs(record.date).isValid()
                            ? <Link to={'/schedule/'+record.key}>{dayjs(record.date).format('DD.MM.YYYY')}</Link>
                            : <Link to={'/schedule/'+record.key}>Не верный формат даты</Link>

                    )
                }
            },
            {
                title: 'Действия',
                key: 'action',
                render: (_, record) => (
                    <Space size="small">
                        <Button onClick={() => onEdit(record.key)} icon={<EditOutlined/>}></Button>
                        <Tooltip title='Выгрузить в Word'>
                            <Button onClick={() => onDownload(record.key)} icon={<DownloadOutlined/>}></Button>
                        </Tooltip>
                        <Button danger type='primary' onClick={() => onRemove(record.key)} icon={<DeleteOutlined/>}></Button>
                    </Space>
                ),
            },
    ] as ColumnsType<ITableDataType>
}
