class ValidationRule {
  String message;
  bool required;
  bool whitespace;
  int len;
  int min;
  int max;
  RegExp pattern;

  ValidationRule({
    this.message,
    this.required,
    this.whitespace,
    this.len,
    this.min,
    this.max,
    this.pattern
  });
}

class Option {
  dynamic value;
  String label;
  List<Option> children;
  String url;
  bool isLeaf;

  Option({this.value, this.label, this.children, this.url, this.isLeaf});


}

enum TemporalType {
  TIME,
  DATE,
  TIMESTAMP,
}

class OptionConvertor {
  String value;
  String title;
  String label;
  String url;
  String parentId;

  OptionConvertor({
    this.value,
    this.title,
    this.label,
    this.parentId
  });
}

class ReferConfig {
  Map<String, Option> options;
  String api;
  String nullTitle;
  String referField;
  OptionConvertor optionConvertor;

  ReferConfig({
    this.options,
    this.api,
    this.nullTitle,
    this.referField,
    this.optionConvertor,
  });
}


class ColumnConfig<T> {
  String key;
  String title;
  bool noJson;
  bool hidden;
  bool isId;
  bool isEnum;


  bool isImage;
  bool isArray;
  bool renderImage;
  String format;
  TemporalType temporalType;
  ReferConfig referConfig;
  bool typeIsHidden;
  List<String> changes;
  String changeBy;
  String nullTitle;
  String falseTitle;
  String trueTitle;
  List<ValidationRule> rules;

  ColumnConfig({
    this.key,
    this.title,
    this.noJson,
    this.hidden,
    this.isId,
    this.isEnum,
    this.isImage,
    this.isArray,
    this.renderImage,
    this.format,
    this.temporalType,
    this.referConfig,
    this.typeIsHidden,
    this.changes,
    this.changeBy,
    this.nullTitle,
    this.falseTitle,
    this.trueTitle,
    this.rules,
  });
}

class FormItemConfig extends ColumnConfig {

  FormItemConfig({
    key,
    title,
    noJson,
    hidden,
    isId,
    isEnum,
    isImage,
    isArray,
    renderImage,
    format,
    temporalType,
    referConfig,
    typeIsHidden,
    changes,
    changeBy,
    nullTitle,
    falseTitle,
    trueTitle,
    rules,
  }) :
      super(key: key,
      title: title,
      noJson: noJson,
      hidden: hidden,
      isId: isId,
      isEnum: isEnum,
      isImage: isImage,
      isArray: isArray,
      renderImage: renderImage,
      format: format,
      temporalType: temporalType,
      referConfig: referConfig,
      typeIsHidden: typeIsHidden,
      changes: changes,
      changeBy: changeBy,
      nullTitle: nullTitle,
      falseTitle: falseTitle,
      trueTitle: trueTitle,
      rules: rules,
    );

  FormItemConfig.clone(ColumnConfig columnConfig) {
    this.key = columnConfig.title;
    this.title = columnConfig.title;
    this.noJson = columnConfig.noJson;
    this.hidden = columnConfig.hidden;
    this.isId = columnConfig.isId;
    this.isEnum = columnConfig.isEnum;
    this.isImage = columnConfig.isImage;
    this.isArray = columnConfig.isArray;
    this.renderImage = columnConfig.renderImage;
    this.format = columnConfig.format;
    this.temporalType = columnConfig.temporalType;
    this.referConfig = columnConfig.referConfig;
    this.typeIsHidden = columnConfig.typeIsHidden;
    this.changes = columnConfig.changes;
    this.changeBy = columnConfig.changeBy;
    this.nullTitle = columnConfig.nullTitle;
    this.falseTitle = columnConfig.falseTitle;
    this.trueTitle = columnConfig.trueTitle;
    this.rules = columnConfig.rules;
  }

}


void confirmChanges(List<FormItemConfig> formItemConfigs) {
  Map<String, FormItemConfig> formItemConfigMap = {};

  formItemConfigs.forEach((FormItemConfig formItemConfig) {
    formItemConfigMap[formItemConfig.key] = formItemConfig;
  });

  formItemConfigs.forEach((FormItemConfig formItemConfig) {
    var changeBy = formItemConfig.changeBy;
    if (changeBy != null) {
      var parentFormItemConfig = formItemConfigMap[changeBy];
      var changes = parentFormItemConfig.changes;
      if (changes == null) {
        changes = [];
        parentFormItemConfig.changes = changes;
      }
      changes.add(formItemConfig.key);
    }
  });
}