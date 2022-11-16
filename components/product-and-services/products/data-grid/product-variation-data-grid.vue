<template>
  <div class="group-product-data-grid">
    <DxDataGrid
      :data-source="groupProductsDataSource"
      :show-borders="true"
      :remote-operations="true"
      :hover-state-enabled="true"
      :row-alternatin-enabled="false"
      :allow-column-reordering="true"
      :column-auto-width="true"
      height="500px"
      @row-updating="rowUpdating"
      @toolbar-preparing="toolbarPreparing"
    >
      <DxSearchPanel position="after" :visible="true" placeholder="Поиск..." />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="groupproductsdatagrid"
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
  props: {
    groupProductData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      groupProductsDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.product,
          removeUrl: this.$dataApi.product,
        }),
        filter: [
          ["groupId", "=", this.groupProductData.groupId],
          "and",
          ["isMain", "=", false],
        ],
      }),
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.productsVariations");
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
      this.$router.push(
        `/admin/products-and-services/products/create-from?productSlug=${this.groupProductData.slug}`
      );
    },
  },
});
</script>

<style lang="scss">
.group-product-data-grid {
  margin-top: 30px;
}
.product-photo {
  border-radius: 100%;
  width: 60px;
}
</style>