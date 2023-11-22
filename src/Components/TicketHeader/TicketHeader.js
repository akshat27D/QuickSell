import React from "react";
import "./TicketHeader.scss";
import { FaPlus } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { TbProgress } from "react-icons/tb";
import { MdSmsFailed } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { TbArrowBarToDown } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuSignalHigh, LuSignalLow } from "react-icons/lu";
import { LuSignalMedium } from "react-icons/lu";
import { RiAlarmWarningFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
// import { useSelector } from 'react-redux';
function TicketHeader({ title, count }) {
  // const GroupType=useSelector((state)=>state.kanbanReducer.GroupType)
  return (
    <div className="tktheader">
      <div className="left">
        <div className="icon">
          {(title == "In progress" && <TbProgress color="green" />) ||
            (title == "Backlog" && <MdSmsFailed color="red" />) ||
            (title == "Done" && <IoMdDoneAll color="blue" />) ||
            (title == "Todo" && <TbArrowBarToDown color="grey" />) ||
            (title == "Cancelled" && <MdCancel color="grey" />) ||
            (title == "No priority" && <HiOutlineDotsHorizontal />) ||
            (title == "Urgent" && <RiAlarmWarningFill color="orange" />) ||
            (title == "High" && <LuSignalHigh />) ||
            (title == "Medium" && <LuSignalMedium />) ||
            (title == "Low" && <LuSignalLow />)}
        </div>
        <div className="title">{title}</div>
        <div className="count">{count}</div>
      </div>
      <div className="right">
        <div className="plus">
          <FaPlus />
        </div>
        <div className="dots">
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
}

export default TicketHeader;
