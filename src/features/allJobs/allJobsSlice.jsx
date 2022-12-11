import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

export const getAllJobs = createAsyncThunk(
    "allJobs/getJobs",
    async (_, thunkAPI) => {
        const { page, search, searchStatus, searchType, sort } =
            thunkAPI.getState().allJobs;

        let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        try {
            const resp = await customFetch.get(url);
            return resp.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const showStatus = createAsyncThunk("allJobs/showStatus", async (_, thunkAPI) => {
    let url = "/jobs/stats";
    try {
        const resp = await customFetch.get(url);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

const initialFiltersState = {
    search: "",
    searchStatus: "all",
    searchType: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"]
};

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState
};

const allJobsSlice = createSlice({
    name: "allJobs",
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
        handleChange: (state, { payload: { name, value } }) => {
            // state.page = 1;
            state[name] = value;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
        changePage: (state, { payload }) => {
            state.page = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllJobs.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllJobs.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.jobs = payload.jobs
                state.totalJobs = payload.totalJobs;
                state.numOfPages = payload.numOfPages;
            })
            .addCase(getAllJobs.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            }).addCase(showStatus.pending, (state) => {
                state.isLoading = true;
            }).addCase(showStatus.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.stats = payload.defaultStats;
                state.monthlyApplications = payload.monthlyApplications
                console.log(payload);
            }).addCase(showStatus.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
    }
});

export const {
    showLoading,
    hideLoading,
    handleChange, clearFilters, changePage
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
