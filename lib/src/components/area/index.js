import Taro, { PureComponent } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { getProvinces, getCities, getAreas } from "./pca_util";

const provinces = getProvinces();

export default class PiArea extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      range: [],
      addressIndex: [0, 0, 0] // 选择的省市区地址下标数组
    };
  }

  componentDidMount() {
    this.setAddressRange(0, 0);
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
    console.log(areas, areaIndex);
    this.setState({
      range: [provinces, cities, areas],
      addressIndex: [provinceIndex, cityIndex, areaIndex]
    });
  }

  onAddressChange = e => {
    const { value } = e.detail;
    const province = provinces[value[0]];
    const city = getCities(province)[value[1]];
    const area = getAreas(province, city)[value[2]];
    this.props.onAddressChange &&
      this.props.onAddressChange({
        province,
        city,
        area
      });
  };

  onColumnchange = e => {
    const { column, value } = e.detail;
    console.log(column, vlaue);
    if (column === 0) this.setAddressRange(value, 0);

    if (column === 1) this.setAddressRange(this.state.addressIndex[0], value);
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
          onColumnchange={this.onColumnchange.bind(this)}
        >
          {/* <View className="picker">
            <AtInput
              disabled
              name="province"
              title="选择地区"
              type="text"
              placeholder="省市区"
              value={this.state.pcaText}
            />
          </View> */}
          {this.props.children}
        </Picker>
      </View>
    );
  }
}
