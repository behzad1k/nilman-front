import {useAppSelector} from '../../services/redux/store';
export function Loading() {
  const loading = useAppSelector((state) => state.loadingReducer.loading);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-spinner">
          <div className="loading">
            <div></div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
