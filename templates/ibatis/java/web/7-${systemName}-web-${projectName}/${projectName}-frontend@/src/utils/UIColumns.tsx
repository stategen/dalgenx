import {
  ColumnConfig, convertImageUrl, getOptionMapFormColumnConfig, getOptionsTitlesText, getRecordValue, makerArray,
  moment
} from "@utils/DvaUtil";

namespace UIColumns {

  function withTitle(result: any, joinTitle: string = null, columnConfig: ColumnConfig<any>) {
    if (joinTitle) {
      result = `${columnConfig.title}${joinTitle}${result}`;
    }
    return result;
  }

  export function InputRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getRecordValue(record, columnConfig);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function TextareaRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getRecordValue(record, columnConfig);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function HiddenRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getRecordValue(record, columnConfig);
    return withTitle(result, joinTitle, columnConfig);
  }


  export function NumberRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getRecordValue(record, columnConfig);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function RateRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getRecordValue(record, columnConfig);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function TimeStampRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const value = getRecordValue(record, columnConfig);
    const result = value ? moment(value).format(columnConfig.format) : null;
    return withTitle(result, joinTitle, columnConfig);
  }

  export function DatePickerRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const value = getRecordValue(record, columnConfig);
    const result = value ? moment(value).format(columnConfig.format) : null;
    return withTitle(result, joinTitle, columnConfig);
  }

  export function TimePickerRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const value = getRecordValue(record, columnConfig);
    const result = value ? moment(value).format(columnConfig.format) : null;
    return withTitle(result, joinTitle, columnConfig);
  }

  export function SelectRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getOptionsTitlesText(columnConfig, record);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function RadioGroupRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getOptionsTitlesText(columnConfig, record);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function SwitchRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const value = getRecordValue(record, columnConfig);
    let result;
    if (value) {
      result = columnConfig.trueTitle;
    } else if (value != null && !value) {
      result = columnConfig.falseTitle;
    } else {
      result = null;
    }
    return withTitle(result, joinTitle, columnConfig);
  }

  export function CascaderRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getOptionsTitlesText(columnConfig, record);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function CheckboxGroupRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    const result = getOptionsTitlesText(columnConfig, record);
    return withTitle(result, joinTitle, columnConfig);
  }

  export function ImageRender(record, joinTitle: string = null, text: string = null, index: number = null, columnConfig: ColumnConfig<any> = null) {
    (!columnConfig) && (columnConfig = this as ColumnConfig<any>);
    let value = getRecordValue(record, columnConfig);
    if (value) {
      const optionMapFormColumnConfig = getOptionMapFormColumnConfig(columnConfig, record);
      const images = [];
      const values = makerArray(value);
      values.forEach((val) => {
        if (val) {
          const imgOption = optionMapFormColumnConfig[val];
          if (imgOption) {
            convertImageUrl(imgOption);
            const url = imgOption.url;
            if (url) {
              if (columnConfig.renderImage) {
                images.push(<img alt={imgOption.value as string} style={{width: '25px'}} src={url}/>);
              } else {
                images.push(url);
              }
            }
          }
        }
      });

      if (columnConfig.isArray) {
        return images;
      } else {
        if (images.length) {
          return images[0];
        }
      }
    }
    return value;
  }
}

export default UIColumns;
