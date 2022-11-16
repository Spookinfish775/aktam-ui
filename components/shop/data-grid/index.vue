<template>
  <div>
    <DxDataGrid
      :data-source="shopsDataSource"
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
      <DxSearchPanel
        position="after"
        :visible="true"
        place
        placeholder="Поиск..."
      />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="shopsdatagrid"
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
        :caption="$t('shopPage.dataGrid.avatar')"
        data-field="shopPhoto"
        width="100"
        cell-template="shopAvatar"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        data-field="nameRu"
        :caption="$t('shopPage.dataGrid.shopName')"
      />
      <DxColumn
        data-field="categories"
        cell-template="categoryTemplate"
        :allow-sorting="false"
        :allow-filtering="false"
        :caption="$t('shopPage.dataGrid.category')"
      />
      <DxColumn
        data-field="user"
        cell-template="ownerTemplate"
        :caption="$t('shopPage.dataGrid.owner')"
      />
      <DxColumn
        data-field="phoneNumber"
        cell-template="numberTemplate"
        :allow-sorting="false"
        :allow-filtering="false"
        :caption="$t('shopPage.dataGrid.phoneNumber')"
      />
      <DxColumn
        cell-template="locationTemplate"
        :allow-sorting="false"
        :allow-filtering="false"
        :caption="$t('shopPage.dataGrid.location')"
      />
      <DxColumn
        data-field="endStoresPaymentPeriod"
        cell-template="paymentTemplate"
        :caption="$t('shopPage.dataGrid.paymentIsValid')"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #shopAvatar="{ data }">
        <img class="shop-avatar" :src="getImage(data)" />
      </template>
      <template #toolbar>
        <BaseToolbar
          :pageTitle="gridTitle"
          :canCreate="isAdmin"
          @onCreate="create"
        />
      </template>
      <template #categoryTemplate="{ data }">
        <CategoryTemplate :categoryData="data.data.categories" />
      </template>
      <template #ownerTemplate="{ data }">
        <div class="ownerData">
          <p>{{ data.data.user.firstName }}</p>
          <p>{{ data.data.user.lastName }}</p>
        </div>
      </template>
      <template #numberTemplate="{ data }">
        <PhoneNumberTemplate :phoneData="data.data.phoneNumbers" />
      </template>
      <template #locationTemplate="{ data }">
        <div class="ownerData" v-if="data.data.country && data.data.city">
          <p>{{ data.data.country.nameRu }}</p>
          <p>{{ data.data.city.nameRu }}</p>
        </div>
      </template>
      <template #paymentTemplate="{ data }">
        <div class="time-left">
          <p>{{ showEndDate(data.data.endStoresPaymentPeriod) }}</p>
          <p>{{ showLeftTime(data.data.endStoresPaymentPeriod) }}</p>
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
import Notification from "../../global-components/notification.vue";
import CategoryTemplate from "../../../components/pages-components/common/categories-template.vue";
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
    Notification,
    CategoryTemplate,
    PhoneNumberTemplate,
  },
  data() {
    return {
      shopsDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.shop,
          removeUrl: this.$dataApi.shop,
        }),
      }),
      autoExpandAll: true,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.shops");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(`/admin/shops/${e.row.data.slug}`);
          },
        },
        this.$store.getters["auth/isAdmin"] ? "delete" : null,
        // "delete",
      ];
    },
  },
  methods: {
    showEndDate(endDate) {
      moment.locale(this.$i18n.locale);
      return `${moment(endDate).format("LL")}`;
    },
    showLeftTime(currentDate) {
      moment.locale(this.$i18n.locale);
      return `${moment().to(currentDate)}`;
    },
    getImage({ data }) {
      const { SERVER_URL } = process.env;

      let result = data.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.Logo
      );
      if (result !== undefined) {
        return `${SERVER_URL}/${result.directoryThumbnails}`;
      } else {
        return "/admin/user.png";
      }
    },
    create() {
      this.$router.push("/admin/shops/create");
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
  mounted() {
    setTimeout(() => {
      this.shopsDataSource.reload();
    }, 500);
  },
});
</script>

<style lang="scss">
.shop-avatar {
  border-radius: 100%;
  width: 60px;
}
</style>
