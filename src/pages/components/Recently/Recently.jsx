import React, { useState, useEffect } from "react";
import recentlyServices from '../../../services/recently.services';
import RecentlyCard from "./RecentlyCard";


const Recently = ({ userId }) => {

    const [recentList, setRecentList] = useState([]);


    useEffect(() => {
        getRecentList()


    }, []);

    const getRecentList = async () => {
        const rs = await recentlyServices.getRecently(userId);
        setRecentList(rs.data)
    }
    return (
        <>
            <h4>
                Mở gần đây
            </h4>
            <div style={{ display: 'flex' }}>
                {recentList ?
                    recentList.map?.(c => <RecentlyCard key={`command-${c.id}`} type={c.type}
                        title={c.title}
                        createdAt={c.createdAt}
                        id={c.entityId} />)
                    : null

                }
            </div>



        </>
    )



}
export default Recently;