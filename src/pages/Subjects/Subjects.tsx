import React, {useEffect, useState} from 'react';
import {Button, Card, message, Table, Typography} from "antd";
import {getColumns, ITableDataType} from "./tableProps";
import {ISubjectForm} from "../../types/forms";
import SubjectApi from "../../api/subject-api";
import SubjectModal from "../../components/SubjectModal/SubjectModal";

const {Title} = Typography;

const Subjects = () => {
    const [tableData, setTableData] = useState<ITableDataType[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [subjectData, setSubjectData] = useState<ISubjectForm>();
    const [editSubjectId, setEditSubjectId] = useState<number>(0);

    const fetchSubjects = () => {
        setLoadingTable(true);
        SubjectApi.getSubjects().then(res => {
            setTableData(res.data.map(item => {
                return {
                    key: item.id,
                    name: item.name,
                    teacherFullName: item.teacher.fullname,
                    office: item.office
                }
            }))
        }).catch((e) => {
            message.error('Ошибка получения данных!');
        });
        setLoadingTable(false);
    };

    const createSubject = (data: ISubjectForm) => {
        setLoadingButton(true);
        SubjectApi.createSubject(data.name, data.office, data.teacherId).then(res => {
            setTableData([...tableData, {
                key: res.data.id,
                name: res.data.name,
                teacherFullName: res.data.teacher.fullname,
                office: res.data.office,
            }])
            setShowModal(false);
        }).catch(e => {
            message.error('Ошибка создания предмета!');
        })
        setLoadingButton(false);
    }

    const editSubject = (data: ISubjectForm) => {
        setLoadingButton(true);
        SubjectApi.editSubject(editSubjectId, data.name, data.office, data.teacherId).then(res => {
            setTableData(tableData.map(item => {
                return item.key === editSubjectId
                    ?
                    {
                        key: res.data.id,
                        name: res.data.name,
                        teacherFullName: res.data.teacher.fullname,
                        office: res.data.office,
                    }
                    : item
            }))
            setShowModal(false);
        }).catch(e => {
            if (e.response.data === 'Subject not found') message.error('Предмет не найден!');
            else message.error('Ошибка редактирования предмета!');
        })
        setLoadingButton(false);
    };

    const onEditSubject = (subjectId: number) => {
        message.loading('Загрузка данных');
        SubjectApi.getSubject(subjectId).then(res => {
            setSubjectData({
                name: res.data.name,
                office: res.data.office,
                teacherId: res.data.teacher.id
            });
            message.destroy();
            setShowModal(true);
            setEditSubjectId(subjectId)
        }).catch(e => {
            message.destroy();
            message.error('Ошибка загрузки данных!');
        });
    }

    const removeSubject = (subjectId: number) => {
        message.loading('Удаление предмета');
        SubjectApi.removeSubject(subjectId).then(res => {
            message.destroy();
            setTableData(tableData.filter(item => item.key !== subjectId));
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
                    <Title level={4}>Предметы</Title>
                    <Button type="primary" onClick={() => {
                        setSubjectData(undefined)
                        setShowModal(true)
                    }}>Создать предмет</Button>
                </div>
                <Table
                    columns={getColumns(onEditSubject, removeSubject)}
                    dataSource={tableData}
                    rowClassName='tableRow'
                    loading={loadingTable}
                    pagination={{showSizeChanger: true}}
                    bordered
                    scroll={{x: 400}}
                />
            </Card>
            <SubjectModal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                onSubmit={subjectData ? editSubject : createSubject}
                loading={loadingButton}
                initialValues={subjectData}
                titleText={subjectData ? subjectData.name : 'Новый предмет'}
                submitText={subjectData ? 'Изменить' : 'Добавить'}
            />
        </>
    );
};

export default Subjects;