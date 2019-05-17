import { ComponentClass } from "react";

import AtComponent from "./base";

export interface PiAreaProps extends AtComponent {
  onAddressChange?: Function;
}

declare const PiArea: ComponentClass<PiAreaProps>;

export default PiArea;
