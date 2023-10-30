import React, {useEffect, useState} from 'react';
import {Card, Descriptions, message, Select, Skeleton, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import SchedulesApi from "../../api/schedules-api";
import {ISchedule} from "../../types/schedule";
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
    const [groupList, setGroupList] = useState<IGroup[]>();
    const [groupsSubjects, setGroupsSubjects] = useState<IGroupSubject[]>();

    const fetchSchedule = async () => {
        try {
            const res = await SchedulesApi.getSchedule(number!);
            setScheduleData(res.data);
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

    useEffect(() => {
        fetchSchedule().then();
        fetchGroups().then();
        fetchLevelSubjects().then();
        // eslint-disable-next-line
    }, [number])

    const addSubject = async (value: any, option: any) => {
        try {
            await ScheduleParamApi.addParam(scheduleData?.id!, option.groupId, value, option.number)
        } catch (e) {
            message.error('Ошибка добавления предмета в расписание!');
        }
    }

    const removeSubject = async (value: any, option: any) => {
        try {
            await ScheduleParamApi.removeParam(scheduleData?.id!, option.groupId, value, option.number)
        } catch (e) {
            message.error('Ошибка удаления предмета из расписания!');
        }
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
                        scheduleData && groupList && groupsSubjects
                            ?
                            groupList?.map((group, index) => (
                                <Descriptions title={group.name} className={style.groupCard} key={index} column={1}>
                                    {
                                        subjectNumber.map((item, index) => (
                                            <Descriptions.Item className={style.card} label={item} key={index}>
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
                                                    onSelect={addSubject}
                                                    onDeselect={removeSubject}
                                                    defaultValue={
                                                        scheduleData?.params
                                                            .filter(param => param.number === item
                                                            && param.group_id === group.id)
                                                            .map(param => {
                                                                return param.subject_id
                                                            })
                                                    }
                                                />
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
        </>
    );
};

export default Schedule;