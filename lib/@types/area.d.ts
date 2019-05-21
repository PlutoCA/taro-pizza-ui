import { ComponentClass } from "react";

import AtComponent from "./base";

declare enum Emode {province, city, area}

export interface PiAreaProps extends AtComponent {
  onAddressChange?: Function;
  mode?: Emode;
}

declare const PiArea: ComponentClass<PiAreaProps>;

export default PiArea;
