/**
 *  Do not remove this unless you get business authorization.
 *  RegionType
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {Options} from "@utils/DvaUtil"

enum RegionType {
  /** STATES */
  STATES = "STATES",
  /** COUNTRY */
  COUNTRY = "COUNTRY",
  /** PROVINCE */
  PROVINCE = "PROVINCE",
  /** DISTRICT */
  DISTRICT = "DISTRICT"

}

export const regionTypeOptions = {
  /** STATES */
  STATES: {
    value: RegionType.STATES,
    title: 'STATES',
  },

  /** COUNTRY */
  COUNTRY: {
    value: RegionType.COUNTRY,
    title: 'COUNTRY',
  },

  /** PROVINCE */
  PROVINCE: {
    value: RegionType.PROVINCE,
    title: 'PROVINCE',
  },

  /** DISTRICT */
  DISTRICT: {
    value: RegionType.DISTRICT,
    title: 'DISTRICT',
  }

}

export default RegionType;