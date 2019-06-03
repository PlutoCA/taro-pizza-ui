import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { PiArea, PiAccordion, PiCalendar } from "pizza_ui";
import "./index.scss";

type state = {
  open: boolean;
  selectedDates: {start: any, end: any}[];
};

export default class Index extends Component<{}, state> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };

  constructor() {
    super(...arguments);
    this.state = {
      open: false,
      selectedDates: [
        {
          start: "2019/06/03",
          end: "2019/06/07"
        },
        {
          start: "2019/06/09",
          end: "2019/06/11"
        }
      ]
    };
  }
  handleClick(value) {
    this.setState({
      open: value
    });
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onAddressChange(res) {
    console.log("查看 res", res);
  }

  render() {
    const { selectedDates } = this.state
    if (!selectedDates || selectedDates.length === 0) {
      return null;
    }
    return (
      <View className="index">
        <Text>Hello world!</Text>
        <PiArea onAddressChange={this.onAddressChange} mode={1}>
          <View className="button">选择省市</View>
        </PiArea>
        <PiAccordion
          open={this.state.open}
          onClick={this.handleClick.bind(this)}
          title="标题一"
          text='这个个测试文本'
        >
          <View>手风琴展示</View>
        </PiAccordion>
        <PiCalendar selectedDates={selectedDates}
        onSelectDate={(res) => {console.log('查看选择的日期', res)}}
        ></PiCalendar>
      </View>
    );
  }
}
