import React, { useEffect } from "react";
import "./Home.scss";
import { VscSettings } from "react-icons/vsc";
import TicketHeader from "../Components/TicketHeader/TicketHeader";
import Card from "../Components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getkanbanData,
  setGroupByPriority,
  setGroupByStatus,
  setGroupByUser,
  setLoading,
  setOrderByName,
  setOrderByPriority,
} from "../Redux/KanbanSlice";
function Home() {
  const GroupType = useSelector((state) => state.kanbanReducer.GroupType);
  const GroupByStatus = useSelector((state) => state.kanbanReducer.GS);
  const GroupByUsers = useSelector((state) => state.kanbanReducer.GU);
  const GroupByPriority = useSelector((state) => state.kanbanReducer.GP);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getkanbanData());
  }, []);

  function handleClick(e) {
    const setting = e.target.value;
    if (setting == "GStatus") {
      
      dispatch(setGroupByStatus());
     
    } 
    else if (setting == "GUsers") {
     
      dispatch(setGroupByUser());
    
    } 
    else if (setting == "GPrior") {
      dispatch(setGroupByPriority());
    } 
    else if (setting == "OPrior") {
      if (GroupType == "status") {
        dispatch(setOrderByPriority(GroupByStatus));
      }
       else if (GroupType == "users") {
        dispatch(setOrderByPriority(GroupByUsers));
      } 
      else {
        dispatch(setOrderByPriority(GroupByPriority));
      }
    } else if (setting == "OTitle") {
      if(GroupType=='status'){
        dispatch(setOrderByName(GroupByStatus))
      }
      else if(GroupType=='users'){
        dispatch(setOrderByName(GroupByUsers))
      }
      else{
        dispatch(setOrderByName(GroupByPriority))
      }
      
    }
  }

  return (
    <div className="home">
      <div className="navbar">
        <div className="cont">
          <label htmlFor="display">
            <VscSettings />
            &nbsp;&nbsp;
          </label>
          <select name="Display" id="display" onClick={handleClick}>
            <option value="GStatus">Grouping By Status</option>
            <option value="GUsers">Grouping By Users</option>
            <option value="GPrior">Grouping By Priority</option>
            <option value="OPrior">Ordering By Priority</option>
            <option value="OTitle">Ordering By Title</option>
          </select>
        </div>
      </div>
      <div className="main">
        {GroupType == "users" &&
          GroupByUsers.map((each) => {
            
            return (
              <div className="same">
                <TicketHeader
                  title={each?.title}
                  count={each?.tkts[0]?.length}
                  key={each?.title}
                />
                {each?.tkts[0]?.map((tkt) => {
                  return (
                    <Card title={tkt?.title} feature={tkt?.tag} id={tkt?.id}  key={tkt?.id}/>
                  );
                })}
                {each.tkts[0].length==0 && 'Nothing to show'}
              </div>
            );
          })}
        {GroupType == "status" &&
          GroupByStatus.map((each) => {
        
            return (
              <div className="same" key={each?.title}>
                <TicketHeader
                  title={each?.title}
                  count={each?.tkts[0]?.length}
                />
                {each?.tkts[0]?.map((tkt) => {
                  return (
                    <Card title={tkt?.title} feature={tkt?.tag} id={tkt?.id} key={tkt?.id}/>
                  );
                })}
                 {each.tkts[0].length==0 && 'Nothing to show'}
              </div>
            );
          })}
        {GroupType == "priority" &&
          GroupByPriority.map((each) => {
    
            return (
              <div className="same">
                <TicketHeader
                  title={each?.title}
                  count={each?.tkts[0]?.length}
                  key={each?.title}
                />
                {each?.tkts[0]?.map((tkt) => {
                  return (
                    <Card title={tkt?.title} feature={tkt?.tag} id={tkt?.id} key={tkt?.id}/>
                  );
                })}
                 {each.tkts[0].length==0 && 'Nothing to show'}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
