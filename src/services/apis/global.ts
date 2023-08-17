import { services } from "../redux/reducers/serviceSlice.ts";

export const initialApis = async (dispatch: any) => {
  await Promise.all([
      dispatch(services())
  ])
}