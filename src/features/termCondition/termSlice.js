import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../Api/baseURL";
const langStorage = localStorage.getItem('lang');
 
const initialState = {
    termsData: {},
    isLoading: false,
    error: null,
  };
  
  
  
  const getTerms = createAsyncThunk('get/terms', async (country, thunkAPI) => {
      try {
        const response = await baseUrl.get(
          `TermsConditions/Get-Term?country=${country}`,{
            headers:{
              'Accept-Language': langStorage
            }
          });
          console.log(response.data);
        return response.data;
      } catch (error) {
        return error
      }
    });



  
  



    const termSlice = createSlice({
        name: 'termsCondition',
      
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(getTerms.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(getTerms.fulfilled, (state, action) => {
              state.termsData = action.payload;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(getTerms.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
            })
            
  
  
           

            }}
            );
      export { getTerms };
      
      export default termSlice.reducer;