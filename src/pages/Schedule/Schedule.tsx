import React from 'react';
import {Card} from "antd";
import {useParams} from "react-router-dom";

const Schedule = () => {
    const {number} = useParams();

    return (
        <Card>
            {number}
        </Card>
    );
};

export default Schedule;