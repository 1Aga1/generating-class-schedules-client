import React, {useEffect, useState} from 'react';
import {Button, Card, message, Table, Typography} from "antd";
import {getColumns, ITableDataType} from "./tableProps";
import {ITeacherForm} from "../../types/forms";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import TeacherApi from "../../api/teacher-api";

const {Title} = Typography;

const Teachers = () => {
    const [tableData, setTableData] = useState<ITableDataType[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [teacherData, setTeacherData] = useState<ITeacherForm>();
    const [editTeacherId, setEditTeacherId] = useState<number>(0);

    const fetchSubjects = () => {
        setLoadingTable(true);
        TeacherApi.getTeachers().then(res => {
            setTableData(res.data.map(item => {
                return {
                    key: item.id,
                    fullname: item.fullname,
                }
            }))
        }).catch((e) => {
            message.error('Ошибка получения данных!');
        });
        setLoadingTable(false);
    };

    const createTeacher = (data: ITeacherForm) => {
        setLoadingButton(true);
        TeacherApi.createTeacher(data.fullname).then(res => {
            setTableData([...tableData, {
                key: res.data.id,
                fullname: res.data.fullname,
            }])
            setShowModal(false);
        }).catch(e => {
            message.error('Ошибка создания учителя!');
        })
        setLoadingButton(false);
    }

    const editTeacher= (data: ITeacherForm) => {
        setLoadingButton(true);
        TeacherApi.editTeacher(editTeacherId, data.fullname).then(res => {
            setTableData(tableData.map(item => {
                return item.key === editTeacherId
                    ?
                    {
                        key: res.data.id,
                        fullname: res.data.fullname,
                    }
                    : item
            }))
            setShowModal(false);
        }).catch(e => {
            if (e.response.data === 'Teacher not found') message.error('Учитель не найден!');
            else message.error('Ошибка редактирования учителя!');
        })
        setLoadingButton(false);
    };

    const onEditTeacher = (teacherId: number) => {
        message.loading('Загрузка данных');
        TeacherApi.getTeacher(teacherId).then(res => {
            setTeacherData({
                fullname: res.data.fullname,
            });
            message.destroy();
            setShowModal(true);
            setEditTeacherId(teacherId)
        }).catch(e => {
            message.destroy();
            message.error('Ошибка загрузки данных!');
        });
    }

    const removeTeacher = (teacherId: number) => {
        message.loading('Удаление учителя');
        TeacherApi.removeTeacher(teacherId).then(res => {
            message.destroy();
            setTableData(tableData.filter(item => item.key !== teacherId));
        }).catch(e => {
            message.error('Ошибка удаления!');
        })
    };

    useEffect(() => {
        fetchSubjects()
    }, [])

    return (
        <>
            <Card>
                <div className='pageHeader'>
                    <Title level={4}>Учителя</Title>
                    <Button type="primary" onClick={() => {
                        setTeacherData(undefined)
                        setShowModal(true)
                    }}>Добавить учителя</Button>
                </div>
                <Table
                    columns={getColumns(onEditTeacher, removeTeacher)}
                    dataSource={tableData}
                    rowClassName='tableRow'
                    loading={loadingTable}
                    pagination={{showSizeChanger: true}}
                    bordered
                    scroll={{x: 400}}
                />
            </Card>
            <TeacherModal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                onSubmit={teacherData ? editTeacher : createTeacher}
                loading={loadingButton}
                initialValues={teacherData}
                titleText={teacherData ? teacherData.fullname : 'Новый учитель'}
                submitText={teacherData ? 'Изменить' : 'Добавить'}
            />
        </>
    );
};

export default Teachers;