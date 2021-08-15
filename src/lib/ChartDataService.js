import dayjs from "dayjs";
import * as dmApi from "../api/dmApi";
import * as chartApi from "../api/chartApi";
const CategoryMaps = Object.freeze({
  record_number: "property_number_count",
  record_bool: "property_bool_count",
  record_string: "property_string_count",
  record_picture: "property_string_count",
  sumarty_number: "properties_number_sum",
  sumarty_bool: "property_bool_count",
  sumarty_string: "property_string_count",
  sumarty_picture: "property_string_count",
  average_number: "property_number_average",
  average_bool: "",
  average_string: "",
  average_picture: "",
  piechart_number: "",
  piechart_bool: "property_bool_count",
  piechart_string: "property_string_count",
  piechart_picture: "property_string_count",
  device_number: "",
  device_bool: "",
  device_string: "",
  device_picture: "",
});
const ChartDataService = {
  getChartDataSpec: async function (data, searchArgs, draw, btnType, api) {
    const spec = await this.getSpec(searchArgs, btnType, draw);
    return {
      data,
      spec,
      draw,
      type,
      isPin: false,
      api,
    };
  },
  getChartData: function (searchArgs, btnType, property) {
    let args = this.getArgs(searchArgs, btnType, property);
    const { data, api } = await this.getData(btnType, property, args);
    const draws = this.getDefalutChartType(btnType);
    const chartData = await Promise.all(
      draws.map(async (draw) => {
        const spec = await this.getSpec(searchArgs, btnType, draw);
        return {
          data,
          spec,
          draw,
          type,
          isPin: false,
          api,
        };
      })
    );
    return chartData;
  },
  getSpec: async function (searchArgs, btnType, draw) {
    const data = this.getDrawData(draw, btnType);
    let spec = await chartApi.drawChart(draw, data);
    return formateSpec(spec, searchArgs);
  },
  formateSpec: function (spec, searchArgs) {
    let { startDate, endDate } = searchArgs;
    if (!startDate && !endDate) {
      startDate = dayjs();
      endDate = dayjs();
    }
    let isSameDate = dayjs(startDate).isSame(endDate, "day");
    if (draw === "arc" || draw === "circle") {
      return spec;
    } else {
      spec = {
        ...spec,
        encoding: {
          ...spec.encoding,
          x: {
            ...spec.encoding.x,
            axis: {
              grid: false,
              format: isSameDate ? "HH:mm" : "MM/DD",
            },
          },
        },
      };
      return spec;
    }
  },
  getDrawData: function (draw, btnType) {
    switch (draw) {
      case "arc":
        return {
          theta: "field_percent",
          color: "field_value",
        };
      case "circle":
        return {
          theta: "field_percent",
          color: "field_value",
          ir: 50,
          or: 90,
        };
      default:
        return btnType === "average" || btnType === "sumarty"
          ? {
              x: "on",
              y: "field_value",
            }
          : {
              x: "on",
              y: "field_count",
              color: "field_value",
            };
    }
  },
  getDefalutChartType: function (btnType) {
    switch (btnType) {
      case "piechart": //比例
        return ["arc", "circle"];
      case "map": //地圖
        return ["map"];
      default:
        return ["line"];
    }
  },
  getData: async function (btnType, property, args) {
    let { type: propertyType } = property;
    const category = CategoryMaps[`${btnType}_${propertyType}`];
    console.log("category=", category);
    let data = [];
    if (category) {
      data = await dmApi.getStatistics(category, args);
      data = data.map((d) => {
        return {
          ...d,
          on: dayjs(d.on).format("YYYY/MM/DD HH:mm"),
          field_percent: d.field_percent ? Number(d.field_percent) * 100 : 0,
          field_value:
            btnType === "average" && isFloat(d.field_value)
              ? d.field_value.toFixed(2)
              : d.field_value,
        };
      });
    }

    return {
      data: data || [],
      api: `/data_manager/api/v1/statistics/${category}`,
    };
  },
  getArgs: function (searchArgs, btnType, property) {
    let {
      propertyId,
      startDate,
      endDate,
      projectId,
      deviceId,
      conditons,
      num,
    } = searchArgs;
    if (!startDate && !endDate) {
      startDate = dayjs();
      endDate = dayjs();
    }
    let args = {
      on: dayjs(startDate).startOf("day").toISOString(),
      to: dayjs(endDate).endOf("day").toISOString(),
      window: this.getWindow(startDate, endDate, btnType),
      project: projectId,
      property: propertyId,
    };

    if (deviceId) {
      args = {
        ...args,
        device: deviceId,
      };
    }
    let { type: propertyType } = property;
    if (btnType !== "piechart") {
      args = {
        ...args,
        ...this.getCondition(propertyType, conditons, num),
      };
    }
    return args;
  },
  getCondition: function (propertyType, conditons, num) {
    switch (propertyType) {
      case "number":
        return {
          operator: conditons === "appear" ? "equal" : conditons,
          value: num,
        };

      default:
        if (conditons === "appear" || conditons === "equal") {
          conditons = "levels";
          return {
            [conditons]: num,
          };
        }
        return {};
    }
  },
  getWindow: function (startDate, endDate, btnType) {
    let diff = dayjs(endDate).diff(startDate, "day");
    let window = dayjs(startDate).isSame(endDate, "day") ? "1h" : "24h";
    return btnType === "piechart" ? `${(diff + 1) * 24}h` : window;
  },
};

export default ChartDataService;
