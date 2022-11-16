<template>
  <div>
    <DxDataGrid
      :data-source="orderDataSource"
      :show-borders="true"
      :remote-operations="true"
      :hover-state-enabled="true"
      :row-alternatin-enabled="false"
      :allow-column-reordering="true"
      :column-auto-width="true"
      height="82vh"
      @row-updating="rowUpdating"
      @toolbar-preparing="toolbarPreparing"
    >
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="ordersdatagrid"
      />
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="form"
      />
      <DxPaging :page-size="10" />
      <DxScrolling mode="virtual" row-rendering-mode="virtual" />

      <DxColumn
        :caption="$t('order.dataGrid.userFullName')"
        data-field="userFullName"
        cell-template="orderUser"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        :caption="$t('order.dataGrid.phoneNumber')"
        data-field="phoneNumberUnauthorizedUser"
      />
      <DxColumn
        data-field="created"
        cell-template="orderDate"
        :caption="$t('order.dataGrid.createDate')"
      />
      <DxColumn
        :caption="$t('order.dataGrid.shop')"
        data-field="shop"
        cell-template="orderShop"
      />
      <DxColumn
        :caption="$t('order.dataGrid.totalPrice')"
        data-field="totalPrice"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" :canCreate="false" />
      </template>

      <template #orderUser="{ data }">
        <div class="order-user-full-name">
          <div class="userData">
            <span>{{ data.data.firstName }}</span>
            <span>{{ data.data.lastName }}</span>
          </div>
        </div>
      </template>
      <template #orderDate="{ data }">
        <div class="created-date">
          <p>{{ showDate(data.data.created) }}</p>
        </div>
      </template>
      <template #orderShop="{ data }">
        <div class="order-shop">
          <img class="shop-logo" :src="getImage(data)" alt="shop-logo" />
          <p class="shop-name">
            {{ getShopName(data) }}
          </p>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxPaging,
  DxScrolling,
  DxStateStoring,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { DxButton } from "devextreme-vue/button";
import moment from "moment";

import { ShopPhotoType } from "../../../infrastructure/enums/ShopPhotoType";

import BaseToolbar from "../../pages-components/base-toolbar.vue";
import PhoneNumberTemplate from "../../../components/pages-components/common/phone-number-template.vue";

export default Vue.extend({
  components: {
    DxButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPaging,
    DxScrolling,
    DxStateStoring,
    DxSearchPanel,
    BaseToolbar,
    PhoneNumberTemplate,
  },
  props: {
    view: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // orderDataSource: new DataSource({
      //   store: this.$dxStore({
      //     key: "id",
      //     loadUrl: this.$dataApi.orderCurrent,
      //     removeUrl: this.$dataApi.order,
      //   }),
      // }),
    };
  },
  computed: {
    orderDataSource() {
      if (this.view) {
        return new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: this.$dataApi.orderDelivered,
          }),
        });
      } else {
        return new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: this.$dataApi.orderCurrent,
            removeUrl: this.$dataApi.order,
          }),
        });
      }
    },
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.orders");
      return title;
    },
    editButtons() {
      if (this.view) {
        return [
          {
            icon: "cart",
            onClick: (e) => {
              this.$router.push(`/admin/orders/${e.row.data.id}`);
            },
          },
        ];
      } else {
        return [
          {
            icon: "cart",
            onClick: (e) => {
              this.$router.push(`/admin/orders/${e.row.data.id}`);
            },
          },
          "delete",
        ];
      }
    },
  },
  methods: {
    showDate(date) {
      moment.locale(this.$i18n.locale);
      return `${moment(date).format("LLL")}`;
    },
    getShopName({ data }) {
      return data.shop.nameRu;
    },
    getImage({ data }) {
      const { SERVER_URL } = process.env;

      let result = data.shop.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.Logo
      );

      if (result !== undefined) {
        return `${SERVER_URL}/${result.directoryThumbnails}`;
      } else {
        return "/icons/store.svg";
      }
    },
    rowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    toolbarPreparing(e) {
      e.toolbarOptions.items = [
        {
          template: "toolbar",
          location: "before",
        },
        ...e.toolbarOptions.items,
      ];
    },
  },
});
</script>

<style lang="scss">
.order-shop {
  display: flex;
  align-items: center;
  .shop-logo {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .shop-name {
    margin: 0 0 0 10px;
    font-weight: 500;
  }
}
</style>