import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getkanbanData = createAsyncThunk(
  "user/getKanbanData",
  async (_,thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      
      const resp = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      return resp?.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false))
    }
  }
);

const kanbanSlice = createSlice({
  name: "kanbanSlice",
  initialState: {
    isLoading:false,
    AllUsers: {},
    AllTickets: {},
    GroupType: "",
    GS: [],
    GP: [],
    GU: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
    setOrderByPriority: (state, action) => {
      
      if (state.GroupType == "status") {
        // console.log("order by priority in status grouping");
        const statusGrouping = action.payload;
        const stGroup = [...statusGrouping];

        for (let i = 0; i < stGroup.length; i++) {
          let tkt = [...stGroup[i].tkts[0]];
          tkt.sort((a, b) => b.priority - a.priority);
          console.log(tkt, "after sorting");
          state.GS[i].tkts[0] = tkt;
        }
      } else if (state.GroupType == "users") {
        // console.log("order by priority in users grouping");
        const usersGrouping = action.payload;
        const usGroup = [...usersGrouping];

        for (let i = 0; i < usGroup.length; i++) {
          let tkt = [...usGroup[i].tkts[0]];
          tkt.sort((a, b) => b.priority - a.priority);
          console.log(tkt, "after sorting");
          state.GU[i].tkts[0] = tkt;
        }
      }
     
    },
    setOrderByName: (state, action) => {
     
      if (state.GroupType == "status") {
        const statusGrouping = action.payload;
        // console.log(statusGrouping);
        const stGroup = [...statusGrouping];

        for (let i = 0; i < stGroup.length; i++) {
          let tkt = [...stGroup[i].tkts[0]];
          tkt.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });
        
          state.GS[i].tkts[0] = tkt;
        }
      } else if (state.GroupType == "users") {
        const statusGrouping = action.payload;
        // console.log(statusGrouping);
        const stGroup = [...statusGrouping];

        for (let i = 0; i < stGroup.length; i++) {
          let tkt = [...stGroup[i].tkts[0]];
          tkt.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });
        
          state.GU[i].tkts[0] = tkt;

      }
    } 

      else {
        const statusGrouping = action.payload;
        // console.log(statusGrouping);
        const stGroup = [...statusGrouping];

        for (let i = 0; i < stGroup.length; i++) {
          let tkt = [...stGroup[i].tkts[0]];
          tkt.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });
        
          state.GP[i].tkts[0] = tkt;

      }

      }
    
    },
    setGroupByStatus: (state, action) => {
      console.log("came at set");
      state.GroupType = "status";
      if (state.GS.length == 0) {
        console.log("came at setgroupbystatus");
        const allStatus = [
          "In progress",
          "Backlog",
          "Todo",
          "Done",
          "Cancelled",
        ];
        const allTickets = state.AllTickets;
        for (const status of allStatus) {
          let filteredTickets = [];
          filteredTickets.push(
            allTickets.filter((each) => {
              return each.status == status;
            })
          );
          state.GS.push({
            title: status,
            tkts: filteredTickets,
          });
        }
      }
    },
    setGroupByUser: (state, action) => {
      state.GroupType = "users";
      if (state.GU.length == 0) {
        const allUsers = state.AllUsers;
        console.log("came at setgroupbyusers");
        // console.log(allUsers, "alluserse");
        const allTickets = state.AllTickets;
        for (const user of allUsers) {
          let filteredTickets = [];
          filteredTickets.push(
            allTickets.filter((each) => {
              return each.userId == user.id;
            })
          );
          state.GU.push({
            title: user.name,
            tkts: filteredTickets,
          });
        }
      }
    },
    setGroupByPriority: (state, action) => {
      state.GroupType = "priority";
      if (state.GP.length == 0) {
        const allPriority = [
          { level: 0, name: "No priority" },
          { level: 4, name: "Urgent" },
          { level: 3, name: "High" },
          { level: 2, name: "Medium" },
          { level: 1, name: "Low" },
        ];
        console.log("came at set group by priority");
        const allTickets = state.AllTickets;
        for (const priority of allPriority) {
          let filteredTickets = [];
          filteredTickets.push(
            allTickets.filter((each) => {
              return each.priority == priority.level;
            })
          );
          state.GP.push({
            title: priority.name,
            tkts: filteredTickets,
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getkanbanData.fulfilled, (state, action) => {
      // console.log(action.payload);

      state.AllTickets = action.payload.tickets;
      state.AllUsers = action.payload.users;
      state.GroupType = "status";
      //   console.log('bsdf');
      const allStatus = ["In progress", "Backlog", "Todo", "Done", "Cancelled"];
      const data = state.AllTickets;
      for (const status of allStatus) {
        let filteredTickets = [];
        filteredTickets.push(
          data.filter((each) => {
            return each.status == status;
          })
        );
        state.GS.push({
          title: status,
          tkts: filteredTickets,
        });
      }
    });
  },
});

export default kanbanSlice.reducer;

export const {
  setLoading,
  showToast,
  setGroupByStatus,
  setGroupByPriority,
  setGroupByUser,
  setOrderByPriority,
  setOrderByName,
} = kanbanSlice.actions;
