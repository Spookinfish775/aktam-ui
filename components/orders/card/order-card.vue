<template>
  <div class="order-card">
    <DxForm ref="form" col-count="2" :form-data.sync="formData">
      <DxGroupItem
        :col-span="2"
        :col-count="2"
        :caption="$t('order.card.customer')"
      >
        <DxSimpleItem
          data-field="firstName"
          editor-type="dxTextBox"
          :editor-options="editorOptions"
        >
          <DxLabel :text="$t('order.card.firstName')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="lastName"
          editor-type="dxTextBox"
          :editor-options="editorOptions"
        >
          <DxLabel :text="$t('order.card.lastName')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="addressUnauthorizedUser"
          editor-type="dxTextBox"
          :editor-options="editorOptions"
        >
          <DxLabel :text="$t('order.card.address')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="phoneNumberUnauthorizedUser"
          editor-type="dxTextBox"
          :editor-options="editorOptions"
        >
          <DxLabel :text="$t('order.card.phoneNumber')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="created"
          editor-type="dxDateBox"
          :editor-options="endDateOptions"
        >
          <DxLabel :text="$t('order.card.date')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="totalPrice"
          editor-type="dxTextBox"
          :editor-options="editorOptions"
        >
          <DxLabel :text="$t('order.card.totalPrice')" />
        </DxSimpleItem>
      </DxGroupItem>

      <!-- <DxGroupItem :col-span="2" :col-count="2"> </DxGroupItem> -->
    </DxForm>

    <div class="order-products-list">
      <div
        class="list-item"
        v-for="(item, index) in orderedProducts"
        :key="index"
      >
        <div v-if="isDelivered" class="remove-button">
          <span class="mdi mdi-close"></span>
        </div>
        <SmallProductCard :productData="item" />
      </div>
    </div>

    <div v-if="isDelivered" class="save-button" @click="acceptOrder">
      {{ $t("order.card.applyOrder") }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxEmailRule,
  DxRequiredRule,
  DxCompareRule,
} from "devextreme-vue/form";
import "devextreme-vue/tag-box";
import { DxTextArea } from "devextreme-vue/text-area";
import { DxAutocomplete } from "devextreme-vue/autocomplete";

import { SelectBoxPropertiesWithDataSource } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";
import { TagBoxPropertiesWithDataSource } from "../../../infrastructure/components-properties/TagBox/TagBoxPropertiesWithDataSource";
import { DateBoxProperties } from "../../../infrastructure/components-properties/DateBoxProperties";
import { Order } from "../../../infrastructure/classes/Order";
import { OrderStatuses } from "../../../infrastructure/data-sources/OrderStatuses";
import { OrderStatus } from "../../../infrastructure/enums/OrderStatus";

import SmallProductCard from "../../../components/orders/card/inner-components/product-card.vue";

export default Vue.extend({
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxEmailRule,
    DxRequiredRule,
    DxCompareRule,
    DxTextArea,
    DxAutocomplete,
    SmallProductCard,
  },
  props: {
    orderData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let formData: Order = new Order(
      this.orderData.id,
      this.orderData.firstName,
      this.orderData.lastName,
      this.orderData.addressUnauthorizedUser,
      this.orderData.phoneNumberUnauthorizedUser,
      this.orderData.countPersonalCharacteristics,
      this.orderData.created,
      this.orderData.orderNumber,
      this.orderData.orderStatus,
      this.orderData.shop,
      this.orderData.shopId,
      this.orderData.totalPrice,
      this.orderData.user,
      this.orderData.userId
    );
    return {
      formData,
      orderedProducts: null,
    };
  },
  computed: {
    isDelivered() {
      if (this.orderData.orderStatus === OrderStatus.Delivered) {
        return false;
      } else {
        return true;
      }
    },
    editorOptions() {
      return {
        disabled: true,
      };
    },
    endDateOptions() {
      return new DateBoxProperties({
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        type: "date",
        applyValueMode: "instantly",
        disabled: true,
        onValueChanged(e) {
          console.log(e);
        },
      });
    },
  },
  methods: {
    async getOrderProducts() {
      let personalCharacteristics = this.orderData.countPersonalCharacteristics;
      let productIds = personalCharacteristics.map(
        (el) => el.personalCharacteristicsId
      );

      await this.$axios
        .post(this.$dataApi.orderedProduct, productIds)
        .then((res) => {
          this.orderedProducts = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async acceptOrder() {
      let order = {
        id: this.orderData.id,
        orderStatus: OrderStatus.Delivered,
      };
      this.$awn.asyncBlock(
        this.$axios.put(this.$dataApi.orderChangeStatus, order),
        (e) => {
          this.$awn.success();
          this.$emit("successedStatusChanged");
        },
        (e) => {
          this.$awn.alert();
          this.$emit("errorStatusChanging");
        }
      );
    },
  },
  mounted() {
    this.getOrderProducts();
  },
});
</script>

<style lang="scss">
.order-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
  .dx-form-group-caption {
    font-weight: 700;
    font-size: 16px;
  }
  .order-products-list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      position: relative;
      .remove-button {
        position: absolute;
        z-index: 10;
        top: 12px;
        right: 12px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: rgba($color: $second-link-color, $alpha: 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        color: $user-card-background-color;
        transition: 0.3s;
        &:hover {
          background-color: rgba($color: $second-link-color, $alpha: 1);
        }
      }
    }
  }
}
</style>