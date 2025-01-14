import globalType from './globalType';

namespace orderType {

  export interface PickingColor {
    attr: null | globalType.Service;
    open: boolean;
  };

  export interface MediaFile {
    preview: null;
    data: null;
  };
}
export default orderType;