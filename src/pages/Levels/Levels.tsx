import React, {useEffect, useState} from 'react';
import {Button, Card, message, Table, Typography} from "antd";
import {getColumns, ITableDataType} from "./tableProps";
import {ILevelForm} from "../../types/forms";
import LevelApi from "../../api/level-api";
import LevelModal from "../../components/LevelModal/LevelModal";

const {Title} = Typography;

const Levels = () => {
    const [tableData, setTableData] = useState<ITableDataType[]>([]);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [levelData, setLevelData] = useState<ILevelForm>();
    const [editLevelId, setEditLevelId] = useState<number>(0);

    const fetchLevels = () => {
        setLoadingTable(true);
        LevelApi.getLevels().then(res => {
            setTableData(res.data.map(item => {
                return {
                    key: item.id,
                    text: item.text,
                    subjects: item.subjects
                }
            }))
        }).catch((e) => {
            message.error('Ошибка получения данных!');
        });
        setLoadingTable(false);
    };

    const createLevel = (data: ILevelForm) => {
        setLoadingButton(true);
        LevelApi.createLevel(data.text).then(res => {
            setTableData([...tableData, {
                key: res.data.id,
                text: res.data.text,
                subjects: res.data.subjects
            }])
            setShowModal(false);
        }).catch(e => {
            message.error('Ошибка создания уровня!');
        })
        setLoadingButton(false);
    }

    const editLevel = (data: ILevelForm) => {
        setLoadingButton(true);
        LevelApi.editLevel(editLevelId, data.text).then(res => {
            setTableData(tableData.map(item => {
                return item.key === editLevelId
                    ?
                    {
                        key: res.data.id,
                        text: res.data.text,
                        subjects: res.data.subjects
                    }
                    : item
            }))
            setShowModal(false);
        }).catch(e => {
            if (e.response.data === 'Schedule not found') message.error('Уровень не найден!');
            else message.error('Ошибка редактирования уровня!');
        })
        setLoadingButton(false);
    };

    const onEditLevel = (levelId: number) => {
        message.loading('Загрузка данных');
        LevelApi.getLevel(levelId).then(res => {
            setLevelData({
                id: res.data.id,
                text: res.data.text,
                subjects: res.data.subjects.map(subject => {
                    return {
                        value: subject.subject.id,
                    }
                })
            });
            message.destroy();
            setShowModal(true);
            setEditLevelId(levelId)
        }).catch(e => {
            message.destroy();
            message.error('Ошибка загрузки данных!');
        });
    }

    const removeLevel = (levelId: number) => {
        message.loading('Удаление уровня');
        LevelApi.removeLevel(levelId).then(res => {
            message.destroy();
            setTableData(tableData.filter(item => item.key !== levelId));
        }).catch(e => {
            message.error('Ошибка удаления!');
        })
    };

    useEffect(() => {
        fetchLevels()
    }, [])

    return (
        <>
            <Card>
                <div className='pageHeader'>
                    <Title level={4}>Уровни подготовки</Title>
                    <Button type="primary" onClick={() => {
                        setLevelData(undefined)
                        setShowModal(true)
                    }}>Создать уровень</Button>
                </div>
                <Table
                    columns={getColumns(onEditLevel, removeLevel)}
                    dataSource={tableData}
                    rowClassName='tableRow'
                    loading={loadingTable}
                    pagination={{showSizeChanger: true}}
                    bordered
                    scroll={{x: 400}}
                />
            </Card>
            <LevelModal
                open={showModal}
                onClose={() => {setShowModal(false)}}
                onSubmit={levelData ? editLevel : createLevel}
                loading={loadingButton}
                initialValues={levelData}
                titleText={levelData ? 'Уровень: '+levelData.text : 'Новый уровень'}
                submitText={levelData ? 'Изменить' : 'Добавить'}
            />
        </>
    );
};

export default Levels;