import React, { useEffect } from 'react';
import { Card, Button, Table, ListGroup, ListGroupItem } from '@themesberg/react-bootstrap';

import moment from "moment";
import meetingServices from '../../../services/meeting.services';


import meetingActions from '../../../actions/meetingActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MeetingList from './MeetingList';


export default () => {

    const dispatch = useDispatch()
    const { attendances, loading } = useSelector(state => state.meeting)
    const { user } = useSelector(state => state.authentication)
    const [nextList, setNextList] = React.useState([])
    const [previousList, setPreviousList] = React.useState([])


    useEffect(() => {

        dispatch(meetingActions.getAssignByUserId(user.id)).then(rs => {
            if (rs) {
                var next = []
                var pre = []

                for (var i = 0; i < rs.length; i++) {


                    const tmp = moment(rs[i].start).valueOf() - moment().valueOf()
                    if (tmp > 0) {
                        next.push(rs[i])
                    }
                    else {

                        pre.push(rs[i])

                    }
                }
                setNextList(next)
                setPreviousList(pre)
            }

        }
        )


    }, [])


    return (
        <>


            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

                <div className="d-block mb-4 mb-xl-0">
                    <h4>Lời mời họp của tôi</h4>
                </div>
            </div>

            {!loading ? (
                <>
                    <div>
                        Cuộc họp sắp tham gia
                        {nextList ? (
                            nextList.map(c => <MeetingList key={`command-${c.id}`} {...c} />)
                        ) : null}
                    </div>
                    <div>
                        Các cuộc họp đã tham gia
                        {previousList ? (
                            previousList.map?.(c => <MeetingList key={`command-${c.id}`} {...c} />)
                        ) : null}

                    </div>

                </>


            ) : 'loading...'}
        </>
    )
}