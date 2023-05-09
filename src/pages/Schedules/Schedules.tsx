import React, {useEffect, useState} from 'react';
import {Button, Card, message, Table, Typography} from "antd";
import {getColumns, ITableDataType} from "./tableProps";
import SchedulesApi from "../../api/schedules-api";
import ScheduleModal from "../../components/ScheduleModal/ScheduleModal";
import {IScheduleForm} from "../../types/forms";
import dayjs from "dayjs";

const {Title} = Typography;

const Schedules = () => {
    const [tableData, setTableData] = useState<ITableDataType[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [scheduleData, setScheduleData] = useState<IScheduleForm>();
    const [editScheduleId, setEditScheduleId] = useState<number>(0);

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

    useEffect(() => {
        fetchSchedules()
    }, [])

    return (
        <>
            <Card>
                <div className='pageHeader'>
                    <Title level={4}>Расписания</Title>
                    <Button type="primary" onClick={() => {
                        setScheduleData(undefined)
                        setShowModal(true)
                    }}>Создать расписание</Button>
                </div>
                <Table
                    columns={getColumns(onEditSchedule, removeSchedule)}
                    dataSource={tableData}
                    rowClassName='tableRow'
                    loading={loadingTable}
                    pagination={{showSizeChanger: true}}
                    bordered
                />
            </Card>
            <ScheduleModal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                onSubmit={scheduleData ? editSchedule : createSchedule}
                loading={loadingButton}
                initialValues={scheduleData}
                titleText={scheduleData ? 'Расписание от '+dayjs(scheduleData.date).format('DD.MM.YYYY') : 'Новое расписание'}
                submitText={scheduleData ? 'Изменить' : 'Добавить'}
            />
        </>
    );
};

export default Schedules;