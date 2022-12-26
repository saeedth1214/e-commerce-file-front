export default {
  data: () => ({
    title: null,
    amountType: null,
    amountValue: null,
    rebateValue: null,
    params: {},
    amounts: [
      {
        operator: "between",
        from: 1000,
        to: 10000,
        value: "1000 تا 10,000",
      },
      {
        operator: "between",
        from: 10000,
        to: 30000,
        value: "10,000 تا 30,000",
      },
      {
        operator: "between",
        from: 30000,
        to: 60000,
        value: "30,000 تا 60,000",
      },
      {
        operator: "between",
        from: 60000,
        to: 100000,
        value: "60,000 تا 100,000",
      },
      {
        operator: ">=",
        from: 100000,
        value: " بیشتر از 100,000",
      },
    ],
    rebates: [
      {
        rebate: 0,
        text: "بدون تخفیف",
      },
      {
        rebate: 1,
        text: "تخفیف دار",
      },
    ],
    filterItems: {},
  }),
  watch: {
    amountType(newVal) {
      newVal
        ? (this.filterItems["amountType"] = {
            text: "براساس قیمت",
            value: newVal === "cash" ? "نقدی" : "رایگان",
          })
        : delete this.filterItems["amountType"];

      if (newVal === "free" || newVal === null) {
        this.amountValue = null;
        this.rebateValue = null;
      }

      (this.filterItems);
    },
    amountValue(newVal) {
      newVal
        ? (this.filterItems["amountValue"] = {
            text: "محدوده قیمت",
            value: newVal.value,
          })
        : delete this.filterItems["amountValue"];
      console.log(this.filterItems);
    },
    rebateValue(newVal) {
      newVal
        ? (this.filterItems["rebateValue"] = {
            text: "بر اساس  تخفیف",
            value: newVal.text,
          })
        : delete this.filterItems["rebateValue"];
      console.log(this.filterItems);
    },
  },
  methods: {
    removeFilter(key) {
      this[key] = null;
    },
    async applyfilter() {
      this.title &&
        this.title.trim() &&
        (this.params = this.createFilter(this.params, "title", {
          value: this.title.trim(),
        }));
      if (this.amountType === "cash") {
        if (!this.amountValue) {
          this.params = this.createFilter(this.params, "amount", {
            operator: ">",
            from: 0,
          });
        }
      } else if (this.amountType === "free") {
        this.params = this.createFilter(this.params, "amount", {
          operator: "=",
          from: 0,
        });
        this.amountValue = null;
        this.rebateValue = null;
      }
      if (this.amountValue) {
        let operation = {};
        operation.operator = this.amountValue.operator;
        this.amountValue.from && (operation.from = this.amountValue.from);
        this.amountValue.to && (operation.to = this.amountValue.to);
        this.params = this.createFilter(this.params, "amount", operation);
      }
      if (this.rebateValue) {
        if (this.rebateValue.rebate) {
          this.params = this.createFilter(this.params, "rebate", {
            operator: ">",
            from: 0,
          });
        } else {
          this.params = this.createFilter(this.params, "rebate", {
            operator: "=",
            from: 0,
          });
        }
      }
      await this.$emit("filterItems", this.params);
      this.params = [];
    },
    createFilter(initial = {}, column, operation = null) {
      let tempParams = initial;
      if (operation.operator) {
        tempParams[`filters[${column}][operator]`] = operation.operator;
        if (operation.operator === "between") {
          operation.from &&
            (tempParams[`filters[${column}][value][from]`] = operation.from);
          operation.to &&
            (tempParams[`filters[${column}][value][to]`] = operation.to);
        } else {
          tempParams[`filters[${column}][value]`] = operation.from;
        }
      } else {
        tempParams[`filters[${column}]`] = operation.value;
      }
      return tempParams;
    },
  },
};
