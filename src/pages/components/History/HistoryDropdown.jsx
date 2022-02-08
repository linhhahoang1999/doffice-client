import React, { useEffect, useState } from 'react';

import { Dropdown, } from '@themesberg/react-bootstrap';

import { faCheck, faPlus, faPlay, faStoreSlash, faTimes, faBan, faSave, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import workServices from '../../../services/work.services';
import taskServices from '../../../services/task.services';
import HistoryRow from './HistoryRow';




const HistoryDropdown = ({ entityId, type }) => {




    const [histories, setHistories] = React.useState();
    const title = (type === "work") ? "lịch sử công việc" : ((type === "task") ? "Lịch sử tác vụ" : "")



    useEffect(() => {
        getHistory()

    }, [])
    // console.log(data)




    const getHistory = async () => {
        if (type === "work") {
            const tmp1 = await workServices.getWorkHistory(entityId)
            setHistories(tmp1.data)
        }
        if (type === "task") {
            const tmp1 = await taskServices.getTaskHistory(entityId)
            setHistories(tmp1.data)
        }

    }






    return (


        <>
            <Dropdown>
                <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                    <FontAwesomeIcon icon={faClock} style={{ marginRight: 5, }} />
                    Lịch sử
                </Dropdown.Toggle>

                <Dropdown.Menu className="history-list">
                    <Dropdown.Header style={{ textAlign: "center" }} >{title}</Dropdown.Header>
                    {histories ?
                        histories.map?.(c =>
                            <div ><HistoryRow key={`command-${c.id}`} {...c} /></div>)
                        : null

                    }

                </Dropdown.Menu>
            </Dropdown>

        </>
    );

}
export default HistoryDropdown;


