import React, { useState, useEffect } from "react";
import moment from "moment";
import "./recently.scss"
import { Link } from "react-router-dom";



const RecentlyCard = ({ type, title, createdAt, id }) => {

    const [recently] = useState(() => {
        var rs = {
            type: (type == "work") ? "Công việc" : "Tác vụ",
            title: title,
            createAt: moment(createdAt).format(" hh:mm:ss a  DD/MM/YYYY"),
        }
        return rs;


    });






    return (
        <>
            <Link to={type + '/detail/' + id}>
                <div className="recently-card" style={{ width: 200, height: 150 }}>
                    <h6 style={{ paddingTop: 5 }}>{recently.type}</h6>
                    <div>{recently.title}</div>
                    <div style={{ fontSize: "small" }}>{recently.createAt}</div>
                </div>
            </Link>




        </>
    )



}
export default RecentlyCard;