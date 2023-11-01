import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Form, Input, InputNumber, message, Modal, Select, Skeleton, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import SchedulesApi from "../../api/schedules-api";
import {ISchedule, IScheduleParams} from "../../types/schedule";
import dayjs from "dayjs";
import GroupApi from "../../api/group-api";
import {IGroup, IGroupSubject} from "../../types/group";
import style from './Schedule.module.scss';
import ScheduleParamApi from "../../api/scheduleParam-api";

const {Title} = Typography;

const Schedule = () => {
    const {number} = useParams();
    const navigate = useNavigate();
    const subjectNumber = [1, 2, 3, 4, 5, 6];

    const [scheduleData, setScheduleData] = useState<ISchedule>();
    const [scheduleParams, setScheduleParams] = useState<IScheduleParams[]>([])
    const [groupList, setGroupList] = useState<IGroup[]>();
    const [groupsSubjects, setGroupsSubjects] = useState<IGroupSubject[]>();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedSubject, setSelectedSubject] = useState<{value: any, option: any}>();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await SchedulesApi.getSchedule(number!);
                setScheduleData(res.data);
                setScheduleParams(res.data.params);
            } catch (e) {
                message.error('Ошибка получения данных!');
                navigate('/schedules');
            }
        }

        const fetchGroups = async () => {
            try {
                const res = await GroupApi.getGroups();
                setGroupList(res.data);
            } catch (e) {
                message.error('Ошибка получения списка классов!');
            }
        }

        const fetchLevelSubjects = async () => {
            try {
                const res = await GroupApi.getGroupSubjects();
                setGroupsSubjects(res.data);
            } catch (e) {
                message.error('Ошибка получения списка предметов!');
            }
        }

        fetchSchedule().then();
        fetchGroups().then();
        fetchLevelSubjects().then();
        // eslint-disable-next-line
    }, [number])

    const selectSubject = (value: any, option: any) => {
        setSelectedSubject({value, option});
        setOpenModal(true);
    }

    const addSubject = async (data: {office: string}) => {
        setLoading(true);
        try {
            const res = await ScheduleParamApi.addParam(scheduleData?.id!, selectedSubject?.option.groupId,
                selectedSubject?.value, selectedSubject?.option.number, data.office)

            setScheduleParams([...scheduleParams, {
                id: res.data.id,
                group_id: res.data.group_id,
                schedule_id: res.data.schedule_id,
                subject_id: res.data.subject_id,
                number: res.data.number,
                office: res.data.office
            }])
        } catch (e) {
            message.error('Ошибка добавления предмета в расписание!');
        }

        setLoading(false);

        setSelectedSubject(undefined);
        setOpenModal(false);
    }

    const removeSubject = async (value: any, option: any) => {
        try {
            await ScheduleParamApi.removeParam(scheduleData?.id!, option.groupId, value, option.number)
            setScheduleParams(scheduleParams.filter(param =>
                param.subject_id !== value || param.number !== option.number
            ))
        } catch (e) {
            message.error('Ошибка удаления предмета из расписания!');
        }
    }

    const closeModal = () => {
        setSelectedSubject(undefined);
        setOpenModal(false);
    }

    return (
        <>
            <Card>
                <div className='pageHeader'>
                    {
                        scheduleData
                            ? <Title level={4}>Расписание на {dayjs(scheduleData?.date).format('DD.MM.YYYY')}</Title>
                            : <Skeleton.Input active />
                    }
                </div>
                <div className={style.schedule}>
                    {
                        scheduleData && groupList && groupsSubjects && scheduleParams
                            ?
                            groupList?.map((group, index) => (
                                <Descriptions title={group.name} className={style.groupCard} key={index} column={1}>
                                    {
                                        subjectNumber.map((item, index) => (
                                            <Descriptions.Item className={style.card} label={item} key={index}>
                                                <div className={style.subject}>
                                                    <Select
                                                        showSearch={false}
                                                        style={{width: '100%'}}
                                                        mode="multiple"
                                                        options={
                                                            groupsSubjects?.filter(subject =>
                                                                subject.group_id === group.id)
                                                                .map(subject => {
                                                                    return {
                                                                        value: subject.subject.id,
                                                                        label: subject.subject.name + ' - ' + subject.subject.teacher,
                                                                        number: item,
                                                                        groupId: group.id
                                                                    }
                                                                })
                                                        }
                                                        onSelect={selectSubject}
                                                        onDeselect={removeSubject}
                                                        defaultValue={
                                                            scheduleParams
                                                                .filter(param => param.number === item
                                                                    && param.group_id === group.id)
                                                                .map(param => {
                                                                    return param.subject_id
                                                                })
                                                        }
                                                    />
                                                    <div className={style.office__list}>
                                                        {
                                                            scheduleParams
                                                                .filter(param => param.number === item
                                                                    && param.group_id === group.id)
                                                                .map((param, index) => (
                                                                        <InputNumber
                                                                            key={index}
                                                                            defaultValue={param.office}
                                                                            readOnly
                                                                            className={style.office__input}
                                                                        ></InputNumber>
                                                                    )
                                                                )
                                                        }
                                                    </div>
                                                </div>
                                            </Descriptions.Item>
                                        ))
                                    }
                                </Descriptions >
                            ))
                            :
                            <Skeleton active></Skeleton>
                    }
                </div>
            </Card>

            <Modal
            open={openModal}
            onCancel={closeModal}
            destroyOnClose
            title='Выбор кабинета'
            width={800}
            footer={null}
            bodyStyle={{paddingTop: 30}}
            >
                <Form labelCol={{span: 8}} wrapperCol={{span: 16}} labelAlign='left' onFinish={addSubject}>
                    <Form.Item name='office' label='Кабинет'>
                        <Input placeholder="Выведите кабинет"></Input>
                    </Form.Item>
                    <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                        <Button htmlType='submit' type='primary' loading={loading}>Добавить</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Schedule;