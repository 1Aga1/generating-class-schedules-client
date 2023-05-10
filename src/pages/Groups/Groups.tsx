import React, {useEffect, useState} from 'react';
import {Button, Card, message, Table, Typography} from "antd";
import {getColumns, ITableDataType} from "./tableProps";
import {IGroupForm} from "../../types/forms";
import GroupApi from "../../api/group-api";
import GroupModal from "../../components/GroupModal/GroupModal";

const {Title} = Typography;

const Groups = () => {
    const [tableData, setTableData] = useState<ITableDataType[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [groupData, setGroupData] = useState<IGroupForm>();
    const [editGroupId, setEditGroupId] = useState<number>(0);

    const fetchGroups = () => {
        setLoadingTable(true);
        GroupApi.getGroups().then(res => {
            setTableData(res.data.map(item => {
                return {
                    key: item.id,
                    name: item.name,
                    level: item.level.text,
                }
            }))
        }).catch((e) => {
            message.error('Ошибка получения данных!');
        });
        setLoadingTable(false);
    };

    const createGroup = (data: IGroupForm) => {
        setLoadingButton(true);
        GroupApi.createGroup(data.levelId, data.name).then(res => {
            setTableData([...tableData, {
                key: res.data.id,
                name: res.data.name,
                level: res.data.level.text,
            }])
            setShowModal(false);
        }).catch(e => {
            message.error('Ошибка создания класса!');
        })
        setLoadingButton(false);
    }

    const editGroup = (data: IGroupForm) => {
        setLoadingButton(true);
        GroupApi.editGroup(editGroupId, data.levelId, data.name).then(res => {
            setTableData(tableData.map(item => {
                return item.key === editGroupId
                    ?
                    {
                        key: res.data.id,
                        name: res.data.name,
                        level: res.data.level.text,
                    }
                    : item
            }))
            setShowModal(false);
        }).catch(e => {
            if (e.response.data === 'Schedule not found') message.error('Класс не найден!');
            else message.error('Ошибка редактирования класса!');
        })
        setLoadingButton(false);
    };

    const onEditGroup = (groupId: number) => {
        message.loading('Загрузка данных');
        GroupApi.getGroup(groupId).then(res => {
            setGroupData({
                levelId: res.data.level.id,
                name: res.data.name
            });
            message.destroy();
            setShowModal(true);
            setEditGroupId(groupId)
        }).catch(e => {
            message.destroy();
            message.error('Ошибка загрузки данных!');
        });
    }

    const removeGroup = (groupId: number) => {
        message.loading('Удаление класса');
        GroupApi.removeGroup(groupId).then(res => {
            message.destroy();
            setTableData(tableData.filter(item => item.key !== groupId));
        }).catch(e => {
            message.error('Ошибка удаления!');
        })
    };

    useEffect(() => {
        fetchGroups()
    }, [])

    return (
        <>
            <Card>
                <div className='pageHeader'>
                    <Title level={4}>Классы</Title>
                    <Button type="primary" onClick={() => {
                        setGroupData(undefined)
                        setShowModal(true)
                    }}>Создать класс</Button>
                </div>
                <Table
                    columns={getColumns(onEditGroup, removeGroup)}
                    dataSource={tableData}
                    rowClassName='tableRow'
                    loading={loadingTable}
                    pagination={{showSizeChanger: true}}
                    bordered
                    scroll={{x: 400}}
                />
            </Card>
            <GroupModal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                onSubmit={groupData ? editGroup : createGroup}
                loading={loadingButton}
                initialValues={groupData}
                titleText={groupData ? groupData.name : 'Новый класс'}
                submitText={groupData ? 'Изменить' : 'Добавить'}
            />
        </>
    );
};

export default Groups;