import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, message, Space, Table, Tooltip, Typography} from "antd";
import {getColumns, ITableDataType} from "./tableProps";
import SchedulesApi from "../../api/schedules-api";
import ScheduleModal from "../../components/ScheduleModal/ScheduleModal";
import {IScheduleForm} from "../../types/forms";
import dayjs from "dayjs";
import {saveBlobToFile} from "../../utils/saveBlobToFile";
import schedulesApi from "../../api/schedules-api";
import {UploadOutlined} from "@ant-design/icons";

const {Title} = Typography;

const Schedules = () => {
    const [tableData, setTableData] = useState<ITableDataType[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [scheduleData, setScheduleData] = useState<IScheduleForm>();
    const [editScheduleId, setEditScheduleId] = useState<number>(0);

    const fileInput = useRef<HTMLInputElement | null>(null)

    const fetchSchedules = () => {
        setLoadingTable(true);
        SchedulesApi.getSchedules().then(res => {
            setTableData(res.data.map(item => {
                return {
                    key: item.id,
                    date: item.date
                }
            }))
        }).catch((e) => {
            message.error('Ошибка получения данных!');
        });
        setLoadingTable(false);
    };

    const createSchedule = (data: IScheduleForm) => {
        setLoadingButton(true);
        SchedulesApi.createSchedule(data.date).then(res => {
            setTableData([...tableData, {
                key: res.data.id,
                date: res.data.date
            }])
            setShowModal(false);
        }).catch(e => {
            message.error('Ошибка создания расписания!');
        })
        setLoadingButton(false);
    }

    const editSchedule = (data: IScheduleForm) => {
        setLoadingButton(true);
        SchedulesApi.editSchedule(editScheduleId, data.date).then(res => {
            setTableData(tableData.map(item => {
                return item.key === editScheduleId
                ?
                    {
                        key: res.data.id,
                        date: res.data.date
                    }
                : item
            }))
            setShowModal(false);
        }).catch(e => {
            if (e.response.data === 'Schedule not found') message.error('Расписание не найдено!');
            else message.error('Ошибка создания расписания!');
        })
        setLoadingButton(false);
    };

    const onEditSchedule = (scheduleId: number) => {
        message.loading('Загрузка данных');
        SchedulesApi.getSchedule(scheduleId).then(res => {
            setScheduleData({
                date: dayjs(res.data.date)
            });
            message.destroy();
            setShowModal(true);
            setEditScheduleId(scheduleId)
        }).catch(e => {
            message.destroy();
            message.error('Ошибка загрузки данных!');
        });
    }

    const removeSchedule = (scheduleId: number) => {
        message.loading('Удаление расписания');
        SchedulesApi.removeSchedule(scheduleId).then(res => {
            message.destroy();
            setTableData(tableData.filter(item => item.key !== scheduleId));
        }).catch(e => {
            message.error('Ошибка удаления!');
        })
    };

    const downloadSchedule = async (scheduleId: number) => {
        message.loading('Выгрузка файла')

        try {
            const res = await schedulesApi.downloadSchedule(scheduleId)
            saveBlobToFile(res.data, `Расписание на ${dayjs(tableData.find(item => item.key === scheduleId)?.date).format('DD.MM.YYYY')}.docx`)
        } catch (_) {
            message.error('Ошибка выгрузки документа!')
        }

        message.destroy();
    }

    const onUploadSchedule = async (file: any) => {
        message.loading('Создание расписания');
        const formData = new FormData();

        formData.append('file', file);
        try {
            await SchedulesApi.uploadSchedule(formData);
            window.location.reload();
            message.success('Расписание создано');
        }
        catch (e) {
            message.destroy();
            message.error('Ошибка загрузки файла!');
        }
    };

    useEffect(() => {
        fetchSchedules()
    }, [])

    return (
        <>
            <input type='file' id='file' ref={fileInput} accept={'.xls, .xlsx'} style={{display: "none"}} onChange={e => onUploadSchedule(e.target.files![0])}/>
            <Card>
                <div className='pageHeader'>
                    <Title level={4}>Расписания</Title>
                    <Space>
                        <Button type="primary"
                                onClick={() => {setScheduleData(undefined); setShowModal(true)}}
                        >
                            Создать расписание
                        </Button>
                        <Tooltip title="Загрузить из файла">
                            <Button
                                onClick={() => fileInput.current?.click()}
                                icon={<UploadOutlined />}
                            ></Button>
                        </Tooltip>
                    </Space>
                </div>
                <Table
                    columns={getColumns(onEditSchedule, removeSchedule, downloadSchedule)}
                    dataSource={tableData}
                    rowClassName='tableRow'
                    loading={loadingTable}
                    pagination={{showSizeChanger: true}}
                    bordered
                    scroll={{x: 400}}
                />
            </Card>
            <ScheduleModal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                onSubmit={scheduleData ? editSchedule : createSchedule}
                loading={loadingButton}
                initialValues={scheduleData}
                titleText={scheduleData ? 'Расписание на '+dayjs(scheduleData.date).format('DD.MM.YYYY') : 'Новое расписание'}
                submitText={scheduleData ? 'Изменить' : 'Добавить'}
            />
        </>
    );
};

export default Schedules;