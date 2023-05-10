import React, {useEffect, useState} from 'react';
import {Card, message, Select, Skeleton, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import SchedulesApi from "../../api/schedules-api";
import {ISchedule} from "../../types/schedule";
import dayjs from "dayjs";
import GroupApi from "../../api/group-api";
import {IGroup} from "../../types/group";
import style from './Schedule.module.scss';
import LevelApi from "../../api/level-api";
import {ILevelSubject} from "../../types/level";
import ScheduleParamApi from "../../api/scheduleParam-api";

const {Title, Text} = Typography;

const Schedule = () => {
    const {number} = useParams();
    const navigate = useNavigate();
    const subjectNumber = [1, 2, 3, 4, 5, 6, 7, 8];

    const [scheduleData, setScheduleData] = useState<ISchedule>();
    const [groupList, setGroupList] = useState<IGroup[]>();
    const [levelsSubjects, setLevelsSubjects] = useState<ILevelSubject[]>();

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
            const res = await LevelApi.getLevelSubjects();
            setLevelsSubjects(res.data);
        } catch (e) {
            message.error('Ошибка получения списка предметов!');
        }
    }

    useEffect(() => {
        fetchSchedule().then();
        fetchGroups().then();
        fetchLevelSubjects().then();
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
                        scheduleData && groupList && levelsSubjects
                            ?
                            groupList?.map((group, index) => (
                                <Card title={group.name} className={style.groupCard} key={index}>
                                    {
                                        subjectNumber.map((item, index) => (
                                            <Card.Grid className={style.card} hoverable={false} key={index}>
                                                <div className={style.subject}>
                                                    <Text style={{margin: '0 8px'}}>{item}</Text>
                                                    <Select
                                                        style={{width: '100%'}}
                                                        mode="multiple"
                                                        options={
                                                            levelsSubjects?.filter(subject =>
                                                                subject.level === group.level.id)
                                                            .map(subject => {
                                                                return {
                                                                    value: subject.subject.id,
                                                                    label: subject.subject.name + ' - ' + subject.subject.office,
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
                                                                && param.group_id == group.id)
                                                                .map(param => {
                                                                    return param.subject_id
                                                                })
                                                        }
                                                    />
                                                </div>
                                            </Card.Grid>
                                        ))
                                    }
                                </Card>
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