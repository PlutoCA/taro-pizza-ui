import dayjs from "dayjs";
import _isEmpty from "lodash/isEmpty";

import Calendar from "../types";

interface PluginArg {
  options: Calendar.GroupOptions;

  selectedDate: Calendar.SelectedDate;
}

// today 不应该使用 selected
export function handleActive(
  args: PluginArg,
  item: Calendar.Item
): Calendar.Item {
  const { selectedDate } = args;
  const { _value } = item;

  const { start, end } = selectedDate;

  const dayjsEnd = dayjs(end);
  const dayjsStart = start ? dayjs(start) : dayjsEnd;

  item.isSelected =
    _value.isSame(dayjsEnd) ||
    _value.isSame(dayjsStart) ||
    (_value.isAfter(dayjsStart) && _value.isBefore(dayjsEnd));

  item.isSelectedHead = _value.isSame(dayjsStart);
  item.isSelectedTail = _value.isSame(dayjsEnd);

  item.isToday = _value.diff(dayjs(Date.now()).startOf("day"), "day") === 0;

  return item;
}

export function handleMarks(
  args: PluginArg,
  item: Calendar.Item
): Calendar.Item {
  const { options } = args;
  const { _value } = item;
  const { marks } = options;

  const markList = marks.filter(mark =>
    dayjs(mark.value)
      .startOf("day")
      .isSame(_value)
  );

  item.marks = markList.slice(0, 1);

  return item;
}

export function handleSelectedDates(
  args: PluginArg,
  item: Calendar.Item
): Calendar.Item {
  const { options } = args;
  const { _value } = item;
  const { selectedDates } = options;

  if (!selectedDates) {
    return item;
  }

  if (selectedDates.length === 0) return item;

  selectedDates.forEach(date => {
    const { isSelected } = item;
    // 如果当前 Item 已经具备了 三种状态下 无需继续判断 跳出循环
    if (isSelected) {
      return false;
    }
    const { start, end } = date;

    const dayjsStart = dayjs(start).startOf("day");
    const dayjsEnd = dayjs(end).startOf("day");

    item.isSelected =
      item.isSelected ||
      (_value.isSame(dayjsStart) || _value.isSame(dayjsEnd)) ||
      (_value.isAfter(dayjsStart) && _value.isBefore(dayjsEnd));

    item.isSelectedHead = _value.isSame(dayjsStart);
    item.isSelectedTail = _value.isSame(dayjsEnd);
  });
  return item;
}

export function handleDisabled(
  args: PluginArg,
  item: Calendar.Item
): Calendar.Item {
  const { options } = args;
  const { _value } = item;
  const { minDate, maxDate } = options;

  const dayjsMinDate = dayjs(minDate);
  const dayjsMaxDate = dayjs(maxDate);

  item.isDisabled =
    !!(minDate && _value.isBefore(dayjsMinDate)) ||
    !!(maxDate && _value.isAfter(dayjsMaxDate));

  return item;
}

export function handleValid(
  args: PluginArg,
  item: Calendar.Item
): Calendar.Item {
  const { options } = args;
  const { _value } = item;
  const { validDates } = options;

  if (!_isEmpty(validDates)) {
    const isInclude = validDates.some(date => {
      return dayjs(date.value)
        .startOf("day")
        .isSame(_value);
    });

    item.isDisabled = !isInclude;
  }

  return item;
}

export function handleInvalid(
  args: PluginArg,
  item: Calendar.Item
): Calendar.Item {
  const { options } = args;
  const { _value } = item;
  const { invalidDates } = options;

  if (!_isEmpty(invalidDates)) {
    const isInclude = invalidDates.some(date => {
      return dayjs(date.value)
        .startOf("day")
        .isSame(_value);
    });

    item.isDisabled = isInclude;
  }

  return item;
}

export default [
  handleActive,
  handleMarks,
  handleDisabled,
  handleValid,
  handleSelectedDates,
  handleInvalid
];
