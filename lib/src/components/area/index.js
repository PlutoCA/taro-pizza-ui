import Taro, { PureComponent } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { getProvinces, getCities, getAreas } from "./pca_util";

const provinces = getProvinces();

export const Emode = {
  province: 0,
  city: 1,
  area: 2
};

export default class PiArea extends PureComponent {
  mode = Emode.province;

  constructor(props) {
    super(props);
    this.state = {
      range: [],
      addressIndex: [0, 0, 0] // 选择的省市区地址下标数组
    };
  }

  componentDidMount() {
    // this.setAddressRange(0, 0);
    this.setRange(0, 0);
  }

  /**
   * 设置地址选择范围
   * @param {number} provinceIndex 省份下标，从 0 开始
   * @param {number} cityIndex 市下标，从 0 开始
   */
  setAddressRange(provinceIndex, cityIndex) {
    const cities = getCities(provinces[provinceIndex]);
    const areas = getAreas(provinces[provinceIndex], cities[cityIndex]);
    const areaIndex = this.state.addressIndex[2];
    this.setState({
      range: [provinces, cities, areas],
      addressIndex: [provinceIndex, cityIndex, areaIndex]
    });
  }

  setRange(provinceIndex, cityIndex) {
    const range = [provinces];
    const addressIndex = [provinceIndex];
    const mode = this.props.mode || this.mode;
    if (mode === Emode.city) {
      range.push(getCities(provinces[provinceIndex]));
      addressIndex.push(cityIndex);
    } else if (mode === Emode.area) {
      const cities = getCities(provinces[provinceIndex]);
      const areas = getAreas(provinces[provinceIndex], cities[cityIndex]);
      addressIndex.push(cityIndex, this.state.addressIndex[2]);
      range.push(cities, areas);
    }
    this.setState({
      range,
      addressIndex
    });
  }

  onAddressChange = e => {
    const { value } = e.detail;
    const mode = this.props.mode || this.mode;
    const province =
      mode === Emode.province ? provinces[value] : provinces[value[0]];
    const city = mode >= Emode.city ? getCities(province)[value[1]] : "";
    const area = mode === Emode.area ? getAreas(province, city)[value[2]] : "";

    this.props.onAddressChange &&
      this.props.onAddressChange({
        province,
        city,
        area
      });
  };

  onColumnChange = e => {
    const { column, value } = e.detail;
    if (column === 0) this.setRange(value, 0);

    if (column === 1) this.setRange(this.state.addressIndex[0], value);
  };

  render() {
    return (
      <View className="area--box">
        {/*
            // @ts-ignore */}
        <Picker
          mode="multiSelector"
          range={this.state.range}
          onChange={this.onAddressChange.bind(this)}
          onColumnChange={this.onColumnChange.bind(this)}
        >
          {this.props.children}
        </Picker>
      </View>
    );
  }
}
