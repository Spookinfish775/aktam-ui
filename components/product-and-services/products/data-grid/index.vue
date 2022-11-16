<template>
  <div>
    <DxDataGrid
      :data-source="productsDataSource"
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
      <DxSearchPanel position="after" :visible="true" placeholder="Поиск..." />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="productsdatagrid"
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
        :caption="$t('products.productDataGrid.productImage')"
        data-field="images"
        width="100"
        cell-template="productPhoto"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        data-field="nameRu"
        :caption="$t('products.productDataGrid.productName')"
      />
      <DxColumn
        data-field="categories"
        cell-template="categoryTemplate"
        :allow-sorting="false"
        :allow-filtering="false"
        :caption="$t('products.productDataGrid.productCategory')"
      />
      <DxColumn
        data-field="price"
        :caption="$t('products.productDataGrid.productPrice')"
      />
      <DxColumn
        data-field="discountPrice"
        :caption="$t('products.productDataGrid.productDiscountPrice')"
      />
      <DxColumn
        data-field="shop.nameRu"
        :caption="$t('products.productDataGrid.productShop')"
      />
      <DxColumn
        data-field="createDate"
        cell-template="createDate"
        :caption="$t('products.productDataGrid.createDate')"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" @onCreate="create" />
      </template>
      <template #productPhoto="{ data }">
        <img class="product-photo" :src="getImage(data)" />
      </template>
      <template #categoryTemplate="{ data }">
        <CategoryTemplate :categoryData="data.data.categories" />
      </template>
      <template #createDate="{ data }">
        <div class="created-date">
          <p>{{ showDate(data.data.createDate) }}</p>
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

import BaseToolbar from "../../../pages-components/base-toolbar.vue";
import CategoryTemplate from "../../../../components/pages-components/common/categories-template.vue";

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
    CategoryTemplate,
  },
  data() {
    return {
      productsDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.product,
          removeUrl: this.$dataApi.product,
        }),
        filter: ["isMain", "=", true],
      }),
      autoExpandAll: true,
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.products");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(
              `/admin/products-and-services/products/${e.row.data.slug}`
            );
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    showDate(date) {
      moment.locale(this.$i18n.locale);
      return `${moment(date).format("LLL")}`;
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
    getImage({ data }) {
      const { SERVER_URL } = process.env;

      let result = data.images.find((item) => item.orderNumber === 0);

      if (result !== undefined) {
        return `${SERVER_URL}/${result.directoryThumbnails}`;
      } else {
        return "/admin/product.png";
      }
    },
    create() {
      this.$router.push("/admin/products-and-services/products/create");
    },
  },
  mounted() {
    setTimeout(() => {
      this.productsDataSource.reload();
    }, 1000);
  },
});
</script>

<style lang="scss">
.product-photo {
  border-radius: 100%;
  width: 60px;
}
</style>